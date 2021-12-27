package wasm

import (
	"context"
	"os"
	"sync"
	"testing"
	"time"

	"github.com/gravitational/trace"
	"github.com/stretchr/testify/require"
	"github.com/wasmerio/wasmer-go/wasmer"

	logrus "github.com/sirupsen/logrus/hooks/test"
)

type testRegularFns struct {
	host *Host

	okFn         wasmer.NativeFunction
	failFn       wasmer.NativeFunction
	infiniteFn   wasmer.NativeFunction
	delay100msFn wasmer.NativeFunction
}

func (f *testRegularFns) ValidateImports(instance *wasmer.Instance) error {
	var err error

	f.okFn, err = instance.Exports.GetFunction("ok")
	if err != nil {
		return trace.Wrap(err)
	}

	f.failFn, err = instance.Exports.GetFunction("fail")
	if err != nil {
		return trace.Wrap(err)
	}

	f.infiniteFn, err = instance.Exports.GetFunction("infinite")
	if err != nil {
		return trace.Wrap(err)
	}

	f.delay100msFn, err = instance.Exports.GetFunction("delay100ms")
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

func (f *testRegularFns) RegisterExports(store *wasmer.Store, importObject *wasmer.ImportObject) error {
	return nil // No-op
}

func (f *testRegularFns) ok(ctx context.Context) (interface{}, error) {
	return f.host.Execute(ctx, f.okFn)
}

func (f *testRegularFns) fail(ctx context.Context) (interface{}, error) {
	return f.host.Execute(ctx, f.failFn)
}

func (f *testRegularFns) infinite(ctx context.Context) (interface{}, error) {
	return f.host.Execute(ctx, f.infiniteFn)
}

func (f *testRegularFns) delay100ms(ctx context.Context) (interface{}, error) {
	return f.host.Execute(ctx, f.delay100msFn)
}

func newHost(t *testing.T) (*Host, *testRegularFns, *logrus.Hook) {
	ctx := context.Background()
	log, hook := logrus.NewNullLogger()

	host := NewHost(ctx, time.Second, 2)
	as := NewAssemblyScriptEnv(host, log)
	fns := &testRegularFns{host: host}

	err := host.RegisterModule(as)
	require.NoError(t, err)

	err = host.RegisterModule(fns)
	require.NoError(t, err)

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	err = host.LoadPlugin(b)
	require.NoError(t, err)

	return host, fns, hook
}

func TestRegularMethods(t *testing.T) {
	ctx := context.Background()
	_, fns, hook := newHost(t)

	r, err := fns.ok(ctx)
	require.NoError(t, err)
	require.Equal(t, r, int32(1))

	_, err = fns.fail(ctx)
	require.Error(t, err, "unreachable")
	require.Contains(t, hook.LastEntry().Message, "Failure")

	_, err = fns.infinite(ctx)
	require.Error(t, err, "execution timeout")
}

// TestParallelExecution the purpose of this test is to ensure that there would be no crashes
func TestParallelExecution(t *testing.T) {
	ctx := context.Background()
	_, fns, _ := newHost(t)

	count := 50 // 100ms * 50 = ~2.5s

	wg := sync.WaitGroup{}
	wg.Add(count)

	for i := 0; i < count; i++ {
		go func() {
			fns.delay100ms(ctx)
			wg.Done()
		}()
	}

	wg.Wait()
}
