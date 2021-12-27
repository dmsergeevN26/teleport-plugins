package wasm

import (
	"context"
	"os"
	"testing"
	"time"

	"github.com/gravitational/trace"
	"github.com/stretchr/testify/require"
	"github.com/wasmerio/wasmer-go/wasmer"

	logrus "github.com/sirupsen/logrus/hooks/test"
)

type testRegularFns struct {
	host *Host

	okFn       wasmer.NativeFunction
	failFn     wasmer.NativeFunction
	infiniteFn wasmer.NativeFunction
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

// func buildHost(t *testing.T) (*Host, logrus.Hook) {

// }

func TestRegularMethods(t *testing.T) {
	ctx := context.Background()
	log, hook := logrus.NewNullLogger()

	h := NewHost(ctx, time.Second, 2)
	as := NewAssemblyScriptEnv(h, log)
	f := &testRegularFns{host: h}

	err := h.RegisterModule(as)
	require.NoError(t, err)

	err = h.RegisterModule(f)
	require.NoError(t, err)

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	err = h.LoadPlugin(b)
	require.NoError(t, err)

	r, err := f.ok(ctx)
	require.NoError(t, err)
	require.Equal(t, r, int32(1))

	_, err = f.fail(ctx)
	require.Error(t, err, "unreachable")
	require.Contains(t, hook.LastEntry().Message, "Failure")

	_, err = f.infinite(ctx)
	require.Error(t, err, "execution timeout")
}
