package wasm

import (
	"context"
	"fmt"
	"os"
	"sync"
	"testing"
	"time"

	"github.com/gravitational/teleport/api/types/events"
	"github.com/gravitational/trace"
	logrus "github.com/sirupsen/logrus/hooks/test"
	"github.com/wasmerio/wasmer-go/wasmer"

	"github.com/stretchr/testify/require"
)

// protoMessage represents UserCreate event with Metadata.ClusterName == "test-cluster"
var protoMessage = []byte{
	18, 120, 10, 75, 8, 1, 18, 11, 117, 115, 101, 114, 46, 99, 114, 101, 97, 116, 101, 26, 36, 51, 54, 100, 97, 52, 48, 57, 49, 45,
	101, 98, 49, 52, 45, 102, 56, 49, 52, 45, 54, 57, 102, 56, 45, 53, 98, 57, 55, 98, 100, 57, 49, 57, 101, 51, 100, 42, 6, 8, 149,
	181, 242, 141, 6, 50, 12, 116, 101, 115, 116, 45, 99, 108, 117, 115, 116, 101, 114, 18, 10, 10, 3, 102, 111, 111, 18, 3, 102,
	111, 111, 26, 18, 10, 3, 102, 111, 111, 18, 11, 8, 128, 146, 184, 195, 152, 254, 255, 255, 255, 1, 34, 9, 116, 101, 115, 116,
	45, 117, 115, 101, 114,
}

type testTraits struct {
	i []*testTrait
}

type testTrait struct {
	im                *ExecutionContext
	ok                wasmer.NativeFunction
	fail              wasmer.NativeFunction
	infinite          wasmer.NativeFunction
	delay100ms        wasmer.NativeFunction
	validatePBMessage wasmer.NativeFunction
}

func newTestTraits() *testTraits {
	return &testTraits{i: make([]*testTrait, 0)}
}

func (e *testTraits) CreateTrait() Trait {
	t := &testTrait{}
	e.i = append(e.i, t)
	return t
}

func (e *testTraits) Bind(t Trait, im *ExecutionContext) {
	t.Bind(im)
}

func (e *testTraits) For(im *ExecutionContext) *testTrait {
	for _, t := range e.i {
		if t.im == im {
			return t
		}
	}

	return nil
}

func (e *testTrait) Export(store *wasmer.Store, imports *wasmer.ImportObject) error {
	return nil
}

func (e *testTrait) Bind(im *ExecutionContext) error {
	var err error

	e.im = im

	exports := im.Instance.Exports

	e.ok, err = exports.GetFunction("ok")
	if err != nil {
		return trace.Wrap(err)
	}

	e.fail, err = exports.GetFunction("fail")
	if err != nil {
		return trace.Wrap(err)
	}

	e.infinite, err = exports.GetFunction("infinite")
	if err != nil {
		return trace.Wrap(err)
	}

	e.delay100ms, err = exports.GetFunction("delay100ms")
	if err != nil {
		return trace.Wrap(err)
	}

	e.validatePBMessage, err = exports.GetFunction("validatePBMessage")
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

func (e *testTrait) OK(ctx context.Context) (interface{}, error) {
	return e.im.Execute(ctx, e.ok)
}

func (e *testTrait) Fail(ctx context.Context) (interface{}, error) {
	return e.im.Execute(ctx, e.fail)
}

func (e *testTrait) Infinite(ctx context.Context) (interface{}, error) {
	return e.im.Execute(ctx, e.infinite)
}

func (e *testTrait) Delay100ms(ctx context.Context) (interface{}, error) {
	return e.im.Execute(ctx, e.delay100ms)
}

func (e *testTrait) ValidatePBMessage(ctx context.Context, dataView interface{}) (interface{}, error) {
	return e.im.Execute(ctx, e.validatePBMessage, dataView)
}

func TestPool(t *testing.T) {
	ctx := context.Background()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	log, _ := logrus.NewNullLogger()
	e := NewAssemblyScriptEnv(log)

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Bytes:       b,
		Timeout:     time.Second,
		Concurrency: 2,
	}, e)
	require.NoError(t, err)

	i, err := p.Get(ctx)
	require.NoError(t, err)
	require.NotNil(t, i)

	require.Len(t, p.instances, 1)
	p.Get(ctx)
	require.Len(t, p.instances, 0)

	err = p.Put(ctx, i)
	require.NoError(t, err)

	require.Len(t, p.instances, 1)
}

func TestRegularMethods(t *testing.T) {
	ctx := context.Background()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	log, hook := logrus.NewNullLogger()
	e := NewAssemblyScriptEnv(log)
	f := newTestTraits()

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Bytes:       b,
		Timeout:     time.Second,
		Concurrency: 2,
	}, e, f)
	require.NoError(t, err)

	i, err := p.Get(ctx)
	require.NoError(t, err)
	require.NotNil(t, i)

	fi := f.For(i)
	require.NotNil(t, fi)

	r, err := fi.OK(ctx)
	require.NoError(t, err)
	require.Equal(t, r, int32(1))

	_, err = fi.Fail(ctx)
	require.Error(t, err, "unreachable")
	require.Contains(t, hook.LastEntry().Message, "Failure")

	_, err = fi.Infinite(ctx)
	require.Error(t, err, "execution timeout")
}

// TestParallelExecution the purpose of this test is to ensure that there would be no crashes
func TestParallelExecution(t *testing.T) {
	ctx := context.Background()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	log, _ := logrus.NewNullLogger()
	e := NewAssemblyScriptEnv(log)
	f := newTestTraits()

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Bytes:       b,
		Timeout:     time.Second,
		Concurrency: 5,
	}, e, f)
	require.NoError(t, err)

	count := 50 // 100ms * 50 * 5 threads = ~1s

	wg := sync.WaitGroup{}
	wg.Add(count)

	for i := 0; i < count; i++ {
		go func() {
			n, err := p.Get(ctx)
			require.NoError(t, err)

			s := f.For(n)
			require.NotNil(t, s)

			s.Delay100ms(ctx)

			err = p.Put(ctx, n)
			require.NoError(t, err)

			wg.Done()
		}()
	}

	wg.Wait()
}

func TestParallelProtobufInteropExecution(t *testing.T) {
	ctx := context.Background()

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	log, hook := logrus.NewNullLogger()
	e := NewAssemblyScriptEnv(log)
	pb := NewProtobufInterop()
	f := newTestTraits()

	p, err := NewExecutionContextPool(ExecutionContextPoolOptions{
		Bytes:       b,
		Timeout:     time.Second,
		Concurrency: 8,
	}, e, f, pb)
	require.NoError(t, err)

	count := 50000

	wg := sync.WaitGroup{}
	wg.Add(count)

	for i := 0; i < count; i++ {
		go func(i int) {
			in, err := p.Get(ctx)
			require.NoError(t, err)

			oneof := events.MustToOneOf(&events.UserCreate{
				Metadata: events.Metadata{
					Index: int64(i),
				},
			})

			dataView, err := pb.For(in).SendMessage(ctx, oneof)
			require.NoError(t, err)

			if len(hook.AllEntries()) > 0 {
				fmt.Println(hook.LastEntry())
			}

			result, err := f.For(in).ValidatePBMessage(ctx, dataView)
			require.NoError(t, err)
			require.Equal(t, result, int64(i))

			err = p.Put(ctx, in)
			require.NoError(t, err)

			wg.Done()
		}(i)
	}

	wg.Wait()
}
