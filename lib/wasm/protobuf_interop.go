package wasm

import (
	"context"

	"github.com/gogo/protobuf/proto"
	"github.com/gravitational/trace"
	wasmer "github.com/wasmerio/wasmer-go/wasmer"
)

const (
	allocFnName     = "__protobuf_alloc"
	getAddrFnName   = "__protobuf_getAddr"
	getLengthFnName = "__protobuf_getLength"
)

type ProtobufInterop struct {
	i []*ProtobufInteropTrait
}

// ProtobufInterop represents protobuf interop methods
type ProtobufInteropTrait struct {
	im        *ExecutionContext
	alloc     wasmer.NativeFunction
	getAddr   wasmer.NativeFunction
	getLength wasmer.NativeFunction
}

// NewProtobufInterop creates new ProtobufInterop bindings
func NewProtobufInterop() *ProtobufInterop {
	return &ProtobufInterop{i: make([]*ProtobufInteropTrait, 0)}
}

func (e *ProtobufInterop) CreateTrait() Trait {
	t := &ProtobufInteropTrait{}
	e.i = append(e.i, t)
	return t
}

func (e *ProtobufInterop) For(im *ExecutionContext) *ProtobufInteropTrait {
	for _, t := range e.i {
		if t.im == im {
			return t
		}
	}

	return nil
}

func (i *ProtobufInteropTrait) Bind(im *ExecutionContext) error {
	var err error

	i.im = im

	i.alloc, err = im.GetFunction(allocFnName)
	if err != nil {
		return trace.Wrap(err)
	}

	i.getAddr, err = im.GetFunction(getAddrFnName)
	if err != nil {
		return trace.Wrap(err)
	}

	i.getLength, err = im.GetFunction(getLengthFnName)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

func (i *ProtobufInteropTrait) Export(store *wasmer.Store, importObject *wasmer.ImportObject) error {
	return nil
}

// SendMessage allocates memory and copies proto.Message to the AS side, returns memory address
func (i *ProtobufInteropTrait) SendMessage(ctx context.Context, message proto.Message) (int32, error) {
	size := proto.Size(message)
	bytes, err := proto.Marshal(message)
	if err != nil {
		return 0, trace.Wrap(err)
	}

	rawAddrSize, err := i.im.Execute(ctx, i.alloc, size)
	if err != nil {
		return 0, trace.Wrap(err)
	}

	i64 := wasmer.NewI64(rawAddrSize)
	addrSize := i64.I64()
	dataView := int32(addrSize >> 32)
	addr := addrSize & 0xFFFFFFFF

	// DMA copy
	memory := i.im.Memory.Data()
	copy(memory[addr:], bytes)

	return dataView, nil
}
