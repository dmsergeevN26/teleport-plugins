package main

import (
	"context"

	"github.com/gravitational/teleport-plugins/lib/wasm"
	"github.com/gravitational/teleport/api/types/events"
	"github.com/gravitational/trace"
	"github.com/wasmerio/wasmer-go/wasmer"
)

// HandleEvent represents collection of handle event traits bound to execution contexts
type HandleEvent struct {
	traits            []*HandleEventTrait
	pb                *wasm.ProtobufInterop
	handleEventFnName string
}

// HandleEventTrait represents trait bound to specific execution context
type HandleEventTrait struct {
	ec                *wasm.ExecutionContext
	pb                *wasm.ProtobufInterop
	handleEventFnName string
	handleEvent       wasmer.NativeFunction
}

// NewHandleEvent creates new HandleEvent trait collection
func NewHandleEvent(handleEventFnName string, pb *wasm.ProtobufInterop) *HandleEvent {
	return &HandleEvent{
		traits:            make([]*HandleEventTrait, 0),
		handleEventFnName: handleEventFnName,
		pb:                pb,
	}
}

// CreateTrait creates new unbound HandleEvent trait
func (e *HandleEvent) CreateTrait() wasm.Trait {
	t := &HandleEventTrait{
		handleEventFnName: e.handleEventFnName,
		pb:                e.pb,
	}
	e.traits = append(e.traits, t)
	return t
}

// Bind binds HandleEventTrait to a specific execution context
func (e *HandleEvent) Bind(t wasm.Trait, ec *wasm.ExecutionContext) {
	t.Bind(ec)
}

// For returns trait bound to a passed execution context
func (e *HandleEvent) For(ec *wasm.ExecutionContext) *HandleEventTrait {
	for _, t := range e.traits {
		if t.ec == ec {
			return t
		}
	}

	return nil
}

// HandleEvent runs handleEvent method within the given execution context
func (e *HandleEvent) HandleEvent(ctx context.Context, ec *wasm.ExecutionContext, evt events.AuditEvent) (events.AuditEvent, error) {
	// Send teleport event to WASM side
	handle, err := e.pb.For(ec).SendMessage(ctx, events.MustToOneOf(evt))
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Get the result
	resultHandle, err := e.For(ec).HandleEvent(ctx, handle)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	i, ok := resultHandle.(int32)
	if !ok {
		return nil, trace.BadParameter("Failed to convert %v to %T", resultHandle, i)
	}

	// Event is skipped, return nil
	if i == 0 {
		return nil, nil
	}

	// Decode the resulting event
	oneOf := &events.OneOf{}

	err = e.pb.For(ec).ReceiveMessage(ctx, resultHandle, oneOf)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	resultEvent, err := events.FromOneOf(*oneOf)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return resultEvent, nil
}

// HandleTeleportEvent calls wasm plugin on TeleportEvent
func (e *HandleEvent) HandleTeleportEvent(ctx context.Context, pool *wasm.ExecutionContextPool, evt *TeleportEvent) (*SanitizedTeleportEvent, error) {
	ec, err := pool.Get(ctx)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	eventAfterWasm, err := e.HandleEvent(ctx, ec, evt.Event)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	err = pool.Put(ctx, ec)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	if eventAfterWasm == nil {
		return nil, nil
	}

	c, err := NewTeleportEvent(eventAfterWasm, evt.Cursor, "")
	if err != nil {
		return nil, trace.Wrap(err)
	}
	return NewSanitizedTeleportEvent(c), nil
}

// Export exports trait function to WASM side
func (e *HandleEventTrait) Export(store *wasmer.Store, imports *wasmer.ImportObject) error {
	return nil
}

// Bind binds HandleEventTrait to a specific execution context and imports wasm functions
func (e *HandleEventTrait) Bind(ec *wasm.ExecutionContext) error {
	var err error

	e.ec = ec

	exports := ec.Instance.Exports

	e.handleEvent, err = exports.GetFunction(e.handleEventFnName)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

// HandleEvent performs handle event call
func (e *HandleEventTrait) HandleEvent(ctx context.Context, handle interface{}) (interface{}, error) {
	return e.ec.Execute(ctx, e.handleEvent, handle)
}
