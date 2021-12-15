package wasm

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"strings"
	"unicode/utf16"

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

// asGetString reads and returns AssemblyScript string by it's memory address. It assumes that
// a string has the standard AS GC header.
func (i *Host) asGetString(s wasmer.Value) string {
	addr := s.I32()
	if addr == 0 {
		return ""
	}

	data := i.memory.Data()
	len := int32(binary.LittleEndian.Uint32(data[addr-4 : addr]))

	// Copy UTF16 string to a buffer
	utf16buf := make([]uint16, len/2)
	for n := 0; n < int(len); n += 2 {
		pos := addr + int32(n)
		utf16buf[n/2] = binary.LittleEndian.Uint16(data[pos : pos+2])
	}

	// Convert UTF16 to UTF8
	stringBuf := &bytes.Buffer{}
	for _, r := range utf16.Decode(utf16buf) {
		stringBuf.WriteRune(r)
	}

	return stringBuf.String()
}

// asAbort AssemblyScript abort() function
func (i *Host) asAbort(args []wasmer.Value) ([]wasmer.Value, error) {
	i.log.Error(fmt.Sprintf(
		"Wasmer: abort! %v (%v:%v:%v)",
		i.asGetString(args[0]),
		i.asGetString(args[1]),
		args[2].I32(),
		args[3].I32(),
	))

	return []wasmer.Value{}, nil
}

// asAbort AssemblyScript trace() function
func (i *Host) asTrace(args []wasmer.Value) ([]wasmer.Value, error) {
	s := i.asGetString(args[0])

	if len(args) > 1 {
		var params []string

		l := int(args[1].I32())
		if len(args)-2 < l {
			l = len(args) - 2
		}

		params = make([]string, l)

		for n := 0; n < l; n++ {
			params[n] = fmt.Sprintf("%v", args[n+2].F64())
		}

		s = s + " " + strings.Join(params, ", ")
	}

	i.log.Info(s)

	return []wasmer.Value{}, nil
}

// LoadPlugin loads plugin from a wasm file and ensures that all exports required exports are present
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
