package wasm

import (
	"context"

	"github.com/gogo/protobuf/proto"
	"github.com/gravitational/trace"
	wasmer "github.com/wasmerio/wasmer-go/wasmer"
)

const (
	// testFnName represents the name of test runner function
	testFnName = "test"
	// getFixtureFnName represents the name of getFixtureBody() function
	getFixtureBodyFnName = "getFixtureBody"
	// getFixtureFnName represents the name of getFixtureSize() function
	getFixtureSizeFnName = "getFixtureSize"
)

var (
	// getFixtureSizeSignature represents wasmer getFixture() signature
	getFixtureSizeSignature = wasmer.NewFunctionType(
		wasmer.NewValueTypes(wasmer.I32), // n:i32
		wasmer.NewValueTypes(wasmer.I32), // i32
	)

	// getFixtureBodySignature represents wasmer getFixture() signature
	getFixtureBodySignature = wasmer.NewFunctionType(
		wasmer.NewValueTypes(wasmer.I32, wasmer.I32), // n:i32, addr:usize
		wasmer.NewValueTypes(),                       // void
	)
)

// TestRunner represents WASM test runner
type TestRunner struct {
	Module
	host         Executor
	FixtureIndex *FixtureIndex
	run          wasmer.NativeFunction
}

// NewTestRunner creates new test runner instance
func NewTestRunner(host Executor, dir string) (*TestRunner, error) {
	index, err := NewFixtureIndex(dir)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return &TestRunner{
		FixtureIndex: index,
		host:         host,
	}, nil
}

// RegisterExports registers getFixture() export
func (r *TestRunner) RegisterExports(store *wasmer.Store, importObject *wasmer.ImportObject) error {
	importObject.Register("test", map[string]wasmer.IntoExtern{
		getFixtureBodyFnName: wasmer.NewFunction(store, getFixtureBodySignature, r.getFixtureBody),
		getFixtureSizeFnName: wasmer.NewFunction(store, getFixtureSizeSignature, r.getFixtureSize),
	})

	return nil
}

// ValidateImports validates that Test() function is present on WASM side
func (r *TestRunner) ValidateImports(instance *wasmer.Instance) error {
	var err error

	r.run, err = instance.Exports.GetFunction(testFnName)
	if err != nil || r.run == nil {
		return NewMissingImportError(r.run, err, testFnName)
	}

	return nil
}

// getFixtureSize returns size of a fixture number n
func (r *TestRunner) getFixtureSize(args []wasmer.Value) ([]wasmer.Value, error) {
	n := int(args[0].I32())

	fixture := r.FixtureIndex.Get(n)
	if fixture == nil {
		return []wasmer.Value{wasmer.NewI32(0)}, trace.Errorf("Fixture %v not found", n)
	}

	size := proto.Size(fixture)

	return []wasmer.Value{wasmer.NewI32(size)}, nil
}

// getFixtureBody copies fixture number n to the provided memory segment
func (r *TestRunner) getFixtureBody(args []wasmer.Value) ([]wasmer.Value, error) {
	n := int(args[0].I32())
	addr := int(args[1].I32())
	memory := r.host.GetMemory()

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
func (r *TestRunner) Run(ctx context.Context) error {
	_, err := r.host.Execute(ctx, r.run)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}
