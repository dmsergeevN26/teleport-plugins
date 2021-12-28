package wasm

import (
	"context"
	"time"

	"github.com/gravitational/trace"
	wasmer "github.com/wasmerio/wasmer-go/wasmer"
)

// Trait represents the accessors to host/wasm methods
type Trait interface {
	Export(*wasmer.Store, *wasmer.ImportObject) error
	Bind(im *ExecutionContext) error
}

// TraitFactory represents the collection of traits
type TraitFactory interface {
	CreateTrait() Trait
}

// ExecutionContext represents object required to execute methods on a specific wasmer instance
type ExecutionContext struct {
	Instance *wasmer.Instance
	Memory   *wasmer.Memory
	timeout  time.Duration
}

// ExecutionContextPool represents wasmer instance pool
type ExecutionContextPool struct {
	timeout   time.Duration
	instances chan *ExecutionContext
}

// ExecutionContextPoolOptions represents instance pool constructor options
type ExecutionContextPoolOptions struct {
	Bytes       []byte
	Timeout     time.Duration
	Concurrency int
}

// NewExecutionContextPool initializes InstancePool structure structure
func NewExecutionContextPool(options ExecutionContextPoolOptions, tf ...TraitFactory) (*ExecutionContextPool, error) {
	config := wasmer.NewConfig().UseCraneliftCompiler()
	engine := wasmer.NewEngineWithConfig(config)
	store := wasmer.NewStore(engine)

	module, err := wasmer.NewModule(store, options.Bytes)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	instances := make(chan *ExecutionContext, options.Concurrency)

	for i := 0; i < options.Concurrency; i++ {
		imports := wasmer.NewImportObject()

		traits := make([]Trait, len(tf))
		for n, t := range tf {
			tr := t.CreateTrait()
			tr.Export(store, imports)
			traits[n] = tr
		}

		instance, err := wasmer.NewInstance(module, imports)
		if err != nil {
			return nil, trace.Wrap(err)
		}

		memory, err := instance.Exports.GetMemory("memory")
		if err != nil {
			return nil, trace.Wrap(err)
		}

		im := &ExecutionContext{instance, memory, options.Timeout}
		for _, t := range traits {
			err = t.Bind(im)
			if err != nil {
				return nil, trace.Wrap(err)
			}
		}

		instances <- im
	}

	return &ExecutionContextPool{
		timeout:   options.Timeout,
		instances: instances,
	}, nil
}

// Get fetches next instance from the pool, if any
func (i *ExecutionContextPool) Get(ctx context.Context) (*ExecutionContext, error) {
	select {
	case im := <-i.instances:
		return im, nil
	case <-ctx.Done():
		return nil, trace.Wrap(ctx.Err())
	}
}

// Put returns instance to the pool
func (i *ExecutionContextPool) Put(ctx context.Context, im *ExecutionContext) error {
	select {
	case i.instances <- im:
		return nil
	case <-ctx.Done():
		return trace.Wrap(ctx.Err())
	}
}

// Close closes instance pool
func (i *ExecutionContextPool) Close() {
	close(i.instances)
}

// GetFunction gets function by name
func (i *ExecutionContext) GetFunction(name string) (wasmer.NativeFunction, error) {
	fn, err := i.Instance.Exports.GetFunction(name)
	if fn == nil {
		return nil, trace.BadParameter("Function `%v` is not a function", name)
	}
	if err != nil {
		return nil, trace.NotImplemented("Function `%v` can not be loaded from WASM module: %v", name, err)
	}

	return fn, nil
}

// Execute executes method with timeout
func (i *ExecutionContext) Execute(ctx context.Context, fn wasmer.NativeFunction, args ...interface{}) (interface{}, error) {
	var ch chan interface{} = make(chan interface{})
	var e chan error = make(chan error)

	go func() {
		r, err := fn(args...)
		if err != nil {
			e <- err
			return
		}
		ch <- r
	}()

	select {
	case err := <-e:
		return nil, trace.Wrap(err)
	case r := <-ch:
		return r, nil
	case <-time.After(i.timeout):
		return nil, trace.LimitExceeded("WASM method execution timeout")
	case <-ctx.Done():
		return nil, trace.Wrap(ctx.Err())
	}
}
