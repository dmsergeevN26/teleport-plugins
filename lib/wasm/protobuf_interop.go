/*
Copyright 2015-2022 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
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
	traits []*ProtobufInteropTrait
}

// ProtobufInterop represents protobuf interop methods
type ProtobufInteropTrait struct {
	ec        *ExecutionContext
	alloc     wasmer.NativeFunction
	getAddr   wasmer.NativeFunction
	getLength wasmer.NativeFunction
}

// NewProtobufInterop creates new ProtobufInterop bindings
func NewProtobufInterop() *ProtobufInterop {
	return &ProtobufInterop{traits: make([]*ProtobufInteropTrait, 0)}
}

func (e *ProtobufInterop) CreateTrait() Trait {
	t := &ProtobufInteropTrait{}
	e.traits = append(e.traits, t)
	return t
}

func (e *ProtobufInterop) For(ec *ExecutionContext) *ProtobufInteropTrait {
	for _, t := range e.traits {
		if t.ec == ec {
			return t
		}
	}

	return nil
}

func (i *ProtobufInteropTrait) Bind(ec *ExecutionContext) error {
	var err error

	i.ec = ec

	i.alloc, err = ec.GetFunction(allocFnName)
	if err != nil {
		return trace.Wrap(err)
	}

	i.getAddr, err = ec.GetFunction(getAddrFnName)
	if err != nil {
		return trace.Wrap(err)
	}

	i.getLength, err = ec.GetFunction(getLengthFnName)
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

	rawAddrSize, err := i.ec.Execute(ctx, i.alloc, size)
	if err != nil {
		return 0, trace.Wrap(err)
	}

	i64 := wasmer.NewI64(rawAddrSize)
	addrSize := i64.I64()
	dataView := int32(addrSize >> 32)
	addr := addrSize & 0xFFFFFFFF

	// DMA copy
	memory := i.ec.Memory.Data()
	copy(memory[addr:], bytes)

	return dataView, nil
}

// ReceiveMessage decodes message from WASM side. Type of the message must be known onset.
func (i *ProtobufInteropTrait) ReceiveMessage(ctx context.Context, handle interface{}, m proto.Message) error {
	rawLength, err := i.ec.Execute(ctx, i.getLength, handle)
	if err != nil {
		return trace.Wrap(err)
	}

	rawAddr, err := i.ec.Execute(ctx, i.getAddr, handle)
	if err != nil {
		return trace.Wrap(err)
	}

	length := wasmer.NewI32(rawLength)
	addr := wasmer.NewI32(rawAddr)

	bytes := make([]byte, length.I32())
	memory := i.ec.Memory.Data()
	copy(bytes, memory[addr.I32():addr.I32()+length.I32()])

	proto.Unmarshal(bytes, m)

	return nil
}
