package wasm

import (
	"context"
	"time"

	"github.com/gravitational/trace"
	wasmer "github.com/wasmerio/wasmer-go/wasmer"
	"golang.org/x/sync/semaphore"
)

// Module represents a module which interacts with WASM. It may provide a host functions and may depend on exports.
type Module interface {
	RegisterExports(store *wasmer.Store, importObject *wasmer.ImportObject) error
	ValidateImports(instance *wasmer.Instance) error
}

// Executor represents an object which executes specified wasmer function
type Executor interface {
	Execute(ctx context.Context, fn wasmer.NativeFunction, args ...interface{}) (interface{}, error)
	GetMemory() *wasmer.Memory
}

// Represents wasmer instance
type Instance struct {
	Executor

	Memory   *wasmer.Memory
	Instance *wasmer.Instance
}

// Host represents wasmer instance. It is responsible for module management and method execution.
type Host struct {
	concurrency  int
	engine       *wasmer.Engine
	store        *wasmer.Store
	module       *wasmer.Module
	importObject *wasmer.ImportObject
	instances    []Instance
	memory       *wasmer.Memory
	timeout      time.Duration
	semaphore    *semaphore.Weighted
	modules      []Module
}

// NewHost initializes Host structure
func NewHost(ctx context.Context, timeout time.Duration, concurrency int) *Host {
	config := wasmer.NewConfig().UseCraneliftCompiler()
	engine := wasmer.NewEngineWithConfig(config)
	store := wasmer.NewStore(engine)
	importObject := wasmer.NewImportObject()

	return &Host{
		concurrency:  concurrency,
		engine:       engine,
		store:        store,
		semaphore:    semaphore.NewWeighted(int64(concurrency)),
		timeout:      timeout,
		importObject: importObject,
		modules:      make([]Module, 0),
		instances:    make([]Instance, concurrency),
	}
}

// Bind binds bindable object to current host
func (i *Host) RegisterModule(module Module) error {
	err := module.RegisterExports(i.store, i.importObject)
	if err != nil {
		return trace.Wrap(err)
	}
	i.modules = append(i.modules, module)

	return nil
}

// GetMemory returns instance memory
func (i *Host) GetMemory() *wasmer.Memory {
	return i.memory
}

// LoadPlugin loads plugin from a wasm file and ensures that all required exports are present
func (i *Host) LoadPlugin(b []byte) error {
	var err error

	i.module, err = wasmer.NewModule(i.store, b)
	if err != nil {
		return trace.Wrap(err)
	}

	for n := 0; n < i.concurrency; n++ {
		instance, err := wasmer.NewInstance(i.module, i.importObject)
		if err != nil {
			return trace.Wrap(err)
		}

		for _, b := range i.modules {
			err := b.ValidateImports(instance)
			if err != nil {
				return trace.Wrap(err)
			}
		}

		i.memory, err = i.instance.Exports.GetMemory("memory")
		if err != nil {
			return trace.Wrap(err)
		}

		i.instances[n] = instance{}
	}

	return nil
}

// Execute executes WASM function with timeout and concurrency
func (i *Host) Execute(ctx context.Context, fn wasmer.NativeFunction, args ...interface{}) (interface{}, error) {
	err := i.semaphore.Acquire(ctx, 1)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	defer func() { i.semaphore.Release(1) }()

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
