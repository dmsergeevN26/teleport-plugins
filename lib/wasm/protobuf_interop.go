package wasm

import (
	"context"

	"github.com/gogo/protobuf/proto"
	"github.com/gravitational/trace"
	wasmer "github.com/wasmerio/wasmer-go/wasmer"
)

const (
	allocFnName     = "__protobuf_alloc"
	freeFnName      = "__protobuf_free"
	getAddrFnName   = "__protobuf_getAddr"
	getLengthFnName = "__protobuf_getLength"
)

// ProtobufInterop represents protobuf interop methods
type ProtobufInterop struct {
	Module
	host        Executor
	allocFn     wasmer.NativeFunction
	freeFn      wasmer.NativeFunction
	getAddrFn   wasmer.NativeFunction
	getLengthFn wasmer.NativeFunction
}

// NewProtobufInterop creates new ProtobufInterop bindings
func NewProtobufInterop(h Executor) *ProtobufInterop {
	return &ProtobufInterop{host: h}
}

// ValidateImports validates that protobuf interop functions exists in the module
func (i *ProtobufInterop) ValidateImports(instance *wasmer.Instance) error {
	var err error

	i.allocFn, err = instance.Exports.GetFunction(allocFnName)
	if i.allocFn == nil || err != nil {
		NewBadFunctionError(i.allocFn, err, allocFnName)
	}

	i.freeFn, err = instance.Exports.GetFunction(freeFnName)
	if i.freeFn == nil || err != nil {
		NewBadFunctionError(i.freeFn, err, freeFnName)
	}

	i.getAddrFn, err = instance.Exports.GetFunction(getAddrFnName)
	if i.getAddrFn == nil || err != nil {
		NewBadFunctionError(i.getAddrFn, err, getAddrFnName)
	}

	i.getLengthFn, err = instance.Exports.GetFunction(getLengthFnName)
	if i.getLengthFn == nil || err != nil {
		NewBadFunctionError(i.getLengthFn, err, getLengthFnName)
	}

	return nil
}

// SendMessage allocates memory and copies proto.Message to the AS side, returns memory address
func (i *ProtobufInterop) SendMessage(ctx context.Context, message proto.Message) error {
	size := proto.Size(message)
	bytes, err := proto.Marshal(message)
	if err != nil {
		return trace.Wrap(err)
	}

	rawAddrSize, err := i.host.Execute(ctx, i.allocFn, size)
	if err != nil {
		return trace.Wrap(err)
	}

	i64 := wasmer.NewI64(rawAddrSize)
	addrSize := i64.I64()
	//dataView = addrSize >> 32
	addr := addrSize & 0xFFFFFFFF

	// rawAddr, err := i.host.Execute(ctx, i.getAddrFn, handler)
	// if err != nil {
	// 	return nil, trace.Wrap(err)
	// }
	//addr := wasmer.NewI32(rawAddr)

	// DMA copy
	memory := i.host.GetMemory().Data()
	copy(memory[addr:], bytes)

	return nil
}

// FreeMessage frees previously allocated memory
func (i *ProtobufInterop) FreeMessage(ctx context.Context, handler int32) error {
	_, err := i.host.Execute(ctx, i.freeFn, handler)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}
