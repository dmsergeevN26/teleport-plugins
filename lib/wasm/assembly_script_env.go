package wasm

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"strings"
	"time"
	"unicode/utf16"

	log "github.com/sirupsen/logrus"
	"github.com/wasmerio/wasmer-go/wasmer"
)

// AsssemblyScriptEnv represents AssemblyScript env functions repository
type AsssemblyScriptEnv struct {
	log    log.FieldLogger
	traits []*AsssemblyScriptEnvTrait
}

// AsssemblyScriptEnvInstance represents AssemblyScript functions bound to specific instance
type AsssemblyScriptEnvTrait struct {
	ec  *ExecutionContext
	log log.FieldLogger
}

// NewAssemblyScriptEnv creates new AssemblyScriptEnv collection instance
func NewAssemblyScriptEnv(log log.FieldLogger) *AsssemblyScriptEnv {
	return &AsssemblyScriptEnv{log: log, traits: make([]*AsssemblyScriptEnvTrait, 0)}
}

func (e *AsssemblyScriptEnv) CreateTrait() Trait {
	t := &AsssemblyScriptEnvTrait{log: e.log}
	e.traits = append(e.traits, t)
	return t
}

func (e *AsssemblyScriptEnvTrait) Bind(ec *ExecutionContext) error {
	e.ec = ec
	return nil
}

// RegisterExports registers protobuf interop exports (nothing in our case)
func (e *AsssemblyScriptEnvTrait) Export(store *wasmer.Store, importObject *wasmer.ImportObject) error {
	importObject.Register("env", map[string]wasmer.IntoExtern{
		"abort": wasmer.NewFunction(store, wasmer.NewFunctionType(
			wasmer.NewValueTypes(
				wasmer.I32, // message: string | null
				wasmer.I32, // fileName: string | null,
				wasmer.I32, // lineNumber: i32
				wasmer.I32, // columnNumber: i32
			),
			wasmer.NewValueTypes(), // void
		), e.abort),
		"trace": wasmer.NewFunction(store, wasmer.NewFunctionType(
			wasmer.NewValueTypes(
				wasmer.I32, // message: string
				wasmer.I32, // n:i32
				wasmer.F64, // a0?:f64
				wasmer.F64, // a1?:f64
				wasmer.F64, // a2?:F64
				wasmer.F64, // a3?:f64
				wasmer.F64, // a4?:f64
			),
			wasmer.NewValueTypes(), // void
		), e.trace),
		"seed": wasmer.NewFunction(store, wasmer.NewFunctionType(
			wasmer.NewValueTypes(),
			wasmer.NewValueTypes(
				wasmer.F64,
			),
		), e.seed),
	})

	importObject.Register("Date", map[string]wasmer.IntoExtern{
		"now": wasmer.NewFunction(store, wasmer.NewFunctionType(
			wasmer.NewValueTypes(),
			wasmer.NewValueTypes(wasmer.F64),
		), e.dateNow),
	})
	return nil
}

// dateNow exports `Date`.`now`, which is required for datetime ops
func (e *AsssemblyScriptEnvTrait) dateNow(args []wasmer.Value) ([]wasmer.Value, error) {
	return []wasmer.Value{wasmer.NewF64(float64(time.Now().UTC().UnixMilli()))}, nil
}

// ValidateImports validates that protobuf interop functions exists in the module
func (e *AsssemblyScriptEnvTrait) ValidateImports(instance *wasmer.Instance) error {
	return nil // No imports
}

// getString reads and returns AssemblyScript string by it's memory address. It assumes that
// a string has the standard AS GC header.
func (e *AsssemblyScriptEnvTrait) getString(s wasmer.Value) string {
	memory := e.ec.Memory

	addr := s.I32()
	if addr == 0 {
		return ""
	}

	data := memory.Data()
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
func (e *AsssemblyScriptEnvTrait) abort(args []wasmer.Value) ([]wasmer.Value, error) {
	e.log.Error(fmt.Sprintf(
		"Wasmer: abort! %v (%v:%v:%v)",
		e.getString(args[0]),
		e.getString(args[1]),
		args[2].I32(),
		args[3].I32(),
	))

	return []wasmer.Value{}, nil
}

// asAbort AssemblyScript trace() function
func (e *AsssemblyScriptEnvTrait) trace(args []wasmer.Value) ([]wasmer.Value, error) {
	s := e.getString(args[0])

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

	e.log.Info(s)

	return []wasmer.Value{}, nil
}

// asSeed implements random seed function
func (e *AsssemblyScriptEnvTrait) seed(args []wasmer.Value) ([]wasmer.Value, error) {
	return []wasmer.Value{wasmer.NewF64(float64(time.Now().UnixNano()))}, nil
}
