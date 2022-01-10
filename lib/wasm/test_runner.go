package wasm

import (
	"context"

	"github.com/gogo/protobuf/proto"
	"github.com/gravitational/trace"
	wasmer "github.com/wasmerio/wasmer-go/wasmer"
)

// TestRunner represents WASM test runner
type TestRunner struct {
	FixtureIndex *FixtureIndex
	traits       []*TestRunnerTrait
}

type TestRunnerTrait struct {
	ec           *ExecutionContext
	FixtureIndex *FixtureIndex
	run          wasmer.NativeFunction
}

// NewTestRunner creates new test runner instance
func NewTestRunner(dir string) (*TestRunner, error) {
	index, err := NewFixtureIndex(dir)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return &TestRunner{FixtureIndex: index, traits: make([]*TestRunnerTrait, 0)}, nil
}

func (r *TestRunner) CreateTrait() Trait {
	t := &TestRunnerTrait{FixtureIndex: r.FixtureIndex}
	r.traits = append(r.traits, t)
	return t
}

func (r *TestRunner) For(ec *ExecutionContext) *TestRunnerTrait {
	for _, t := range r.traits {
		if t.ec == ec {
			return t
		}
	}

	return nil
}

func (r *TestRunnerTrait) Bind(ec *ExecutionContext) error {
	var err error

	r.ec = ec

	r.run, err = r.ec.GetFunction("test")
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

// ExportHostMethods registers getFixture() export
func (r *TestRunnerTrait) Export(store *wasmer.Store, importObject *wasmer.ImportObject) error {
	importObject.Register("test", map[string]wasmer.IntoExtern{
		"getFixtureBody": wasmer.NewFunction(store, wasmer.NewFunctionType(
			wasmer.NewValueTypes(wasmer.I32, wasmer.I32), // n:i32, addr:usize
			wasmer.NewValueTypes(),                       // void
		), r.getFixtureBody),
		"getFixtureSize": wasmer.NewFunction(store, wasmer.NewFunctionType(
			wasmer.NewValueTypes(wasmer.I32), // n:i32
			wasmer.NewValueTypes(wasmer.I32), // i32
		), r.getFixtureSize),
	})

	return nil
}

// getFixtureSize returns size of a fixture number n
func (r *TestRunnerTrait) getFixtureSize(args []wasmer.Value) ([]wasmer.Value, error) {
	n := int(args[0].I32())

	fixture := r.FixtureIndex.Get(n)
	if fixture == nil {
		return []wasmer.Value{wasmer.NewI32(0)}, trace.Errorf("Fixture %v not found", n)
	}

	size := proto.Size(fixture)

	return []wasmer.Value{wasmer.NewI32(size)}, nil
}

// getFixtureBody copies fixture number n to the provided memory segment
func (r *TestRunnerTrait) getFixtureBody(args []wasmer.Value) ([]wasmer.Value, error) {
	n := int(args[0].I32())
	addr := int(args[1].I32())
	memory := r.ec.Memory

	fixture := r.FixtureIndex.Get(n)
	if fixture == nil {
		return []wasmer.Value{wasmer.NewI32(0)}, trace.Errorf("Fixture %v not found", n)
	}

	bytes, err := proto.Marshal(fixture)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// DMA copy
	copy(memory.Data()[addr:], bytes)

	return nil, nil
}

// Run runs test suite
func (r *TestRunnerTrait) Run(ctx context.Context) error {
	_, err := r.ec.Execute(ctx, r.run)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}
