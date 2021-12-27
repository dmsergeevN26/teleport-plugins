package wasm

import (
	"github.com/gravitational/trace"
	"github.com/wasmerio/wasmer-go/wasmer"
)

// NewBadFunctionError creates new error for missing export function
func NewBadFunctionError(fn wasmer.NativeFunction, err error, fnName string) error {
	if fn == nil {
		return trace.BadParameter("Function `%v` is not a function", fnName)
	}
	if err != nil {
		return trace.NotImplemented("Function `%v` can not be loaded from WASM module: %v", fnName, err)
	}

	return nil
}
