package wasm

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"unicode/utf16"
	"unicode/utf8"

	"github.com/gravitational/trace"
	log "github.com/sirupsen/logrus"
	wasmer "github.com/wasmerio/wasmer-go/wasmer"
)

const (
	CRANELIFT = "cranelift"
	LLVM      = "llvm"
)

var (
	interopFnsNames = []string{
		"__protobuf_alloc", "__protobuf_free", "__protobuf_setu8", "__protobuf_getAddr", "__protobuf_getLength",
	}

	// AssemblyScript abort() signature
	asAbortSignature = wasmer.NewFunctionType(
		wasmer.NewValueTypes(
			wasmer.ValueKind(wasmer.I32), // message: string | null
			wasmer.ValueKind(wasmer.I32), // fileName: string | null,
			wasmer.ValueKind(wasmer.I32), // lineNumber: i32
			wasmer.ValueKind(wasmer.I32), // columnNumber: i32
		),
		wasmer.NewValueTypes(), // void
	)

	// AssemblyScript trace() signature
	asTraceSignature = wasmer.NewFunctionType(
		wasmer.NewValueTypes(
			wasmer.ValueKind(wasmer.I32), // message: string
			wasmer.ValueKind(wasmer.I32), // n:i32
			wasmer.ValueKind(wasmer.F64), // a0?:f64
			wasmer.ValueKind(wasmer.F64), // a1?:f64
			wasmer.ValueKind(wasmer.F64), // a2?:F64
			wasmer.ValueKind(wasmer.F64), // a3?:f64
			wasmer.ValueKind(wasmer.F64), // a4?:f64
		),
		wasmer.NewValueTypes(), // void
	)
)

type Host struct {
	engine       *wasmer.Engine
	store        *wasmer.Store
	module       *wasmer.Module
	importObject *wasmer.ImportObject
	instance     *wasmer.Instance
	memory       *wasmer.Memory
	interopFns   map[string]wasmer.NativeFunction
	log          log.FieldLogger
}

type Options struct {
	Compiler string
	Logger   log.FieldLogger
}

func (o Options) AsConfig() (*wasmer.Config, error) {
	c := wasmer.NewConfig()

	switch o.Compiler {
	case CRANELIFT:
		c = c.UseCraneliftCompiler()
	case LLVM:
		c = c.UseLLVMCompiler()
	default:
		return nil, trace.BadParameter("Unknown compiler kind %v!", o.Compiler)
	}

	return c, nil
}

func NewHost(options Options) (*Host, error) {
	config, err := options.AsConfig()
	if err != nil {
		return nil, trace.Wrap(err)
	}

	engine := wasmer.NewEngineWithConfig(config)
	store := wasmer.NewStore(engine)

	return &Host{
		engine:     engine,
		store:      store,
		log:        options.Logger,
		interopFns: make(map[string]wasmer.NativeFunction),
	}, nil
}

func DecodeUTF16(b []byte) (string, error) {

	if len(b)%2 != 0 {
		return "", fmt.Errorf("Must have even length byte slice")
	}

	u16s := make([]uint16, 1)
	ret := &bytes.Buffer{}
	b8buf := make([]byte, 4)

	lb := len(b)
	for i := 0; i < lb; i += 2 {
		u16s[0] = uint16(b[i]) + (uint16(b[i+1]) << 8)
		r := utf16.Decode(u16s)
		n := utf8.EncodeRune(b8buf, r[0])
		ret.Write(b8buf[:n])
	}

	return ret.String(), nil
}

func (i *Host) asGetString(s wasmer.Value) string {
	addr := s.I32()
	data := i.memory.Data()
	len := int32(binary.LittleEndian.Uint32(data[addr-4 : addr]))
	buf := make([]byte, len)

	for i := 0; i < int(len); i += 1 {
		pos := addr + int32(i*2)
		c := binary.LittleEndian.Uint16(data[pos : pos+2])
		binary.BigEndian.PutUint16(buf[i*2:], c)
	}

	str, err := DecodeUTF16(buf)
	if err != nil {
		panic(err)
	}

	return str
}

func (i *Host) asAbort(args []wasmer.Value) ([]wasmer.Value, error) {
	i.log.Error(i.asGetString(args[0]))

	return []wasmer.Value{}, nil
}

func (i *Host) asTrace(args []wasmer.Value) ([]wasmer.Value, error) {
	i.log.Info(i.asGetString(args[0]))

	return []wasmer.Value{}, nil
}

func (i *Host) LoadPlugin(b []byte) error {
	var err error

	i.module, err = wasmer.NewModule(i.store, b)
	if err != nil {
		return trace.Wrap(err)
	}

	i.importObject = wasmer.NewImportObject()
	i.importObject.Register("env", map[string]wasmer.IntoExtern{
		"abort": wasmer.NewFunction(i.store, asAbortSignature, i.asAbort),
		"trace": wasmer.NewFunction(i.store, asTraceSignature, i.asTrace),
	})

	i.instance, err = wasmer.NewInstance(i.module, i.importObject)
	if err != nil {
		return trace.Wrap(err)
	}

	for _, name := range interopFnsNames {
		i.interopFns[name], err = i.instance.Exports.GetFunction(name)
		if err != nil {
			return trace.Wrap(err)
		}
	}

	i.memory, err = i.instance.Exports.GetMemory("memory")
	if err != nil {
		return trace.Wrap(err)
	}

	fn, _ := i.instance.Exports.GetFunction("testTrace")
	fn()

	return nil
}
