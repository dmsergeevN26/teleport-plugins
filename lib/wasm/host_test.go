package wasm

import (
	"context"
	"fmt"
	"os"
	"sync"
	"testing"
	"time"

	"github.com/gogo/protobuf/proto"
	"github.com/gravitational/teleport/api/types/events"
	"github.com/gravitational/trace"
	"github.com/stretchr/testify/require"
	"github.com/wasmerio/wasmer-go/wasmer"

	logrus "github.com/sirupsen/logrus/hooks/test"
)

// UserCreate event with Metadata.ClusterName == "test-cluster"
var protoMessage = []byte{
	18, 120, 10, 75, 8, 1, 18, 11, 117, 115, 101, 114, 46, 99, 114, 101, 97, 116, 101, 26, 36, 51, 54, 100, 97, 52, 48, 57, 49, 45,
	101, 98, 49, 52, 45, 102, 56, 49, 52, 45, 54, 57, 102, 56, 45, 53, 98, 57, 55, 98, 100, 57, 49, 57, 101, 51, 100, 42, 6, 8, 149,
	181, 242, 141, 6, 50, 12, 116, 101, 115, 116, 45, 99, 108, 117, 115, 116, 101, 114, 18, 10, 10, 3, 102, 111, 111, 18, 3, 102,
	111, 111, 26, 18, 10, 3, 102, 111, 111, 18, 11, 8, 128, 146, 184, 195, 152, 254, 255, 255, 255, 1, 34, 9, 116, 101, 115, 116,
	45, 117, 115, 101, 114,
}

const concurrency = 8

type testRegularFns struct {
	host *Host

	okFn                wasmer.NativeFunction
	failFn              wasmer.NativeFunction
	infiniteFn          wasmer.NativeFunction
	delay100msFn        wasmer.NativeFunction
	validatePBMessageFn wasmer.NativeFunction
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

	f.validatePBMessageFn, err = instance.Exports.GetFunction("validatePBMessage")
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

func (f *testRegularFns) validatePBMessage(ctx context.Context, dataView interface{}) (interface{}, error) {
	return f.host.Execute(ctx, f.validatePBMessageFn, dataView)
}

func newHost(t *testing.T) (*Host, *testRegularFns, *ProtobufInterop, *logrus.Hook) {
	ctx := context.Background()
	log, hook := logrus.NewNullLogger()

	host := NewHost(ctx, time.Second, concurrency)
	as := NewAssemblyScriptEnv(host, log)
	fns := &testRegularFns{host: host}
	pb := NewProtobufInterop(host)

	err := host.RegisterModule(as)
	require.NoError(t, err)

	err = host.RegisterModule(fns)
	require.NoError(t, err)

	err = host.RegisterModule(pb)
	require.NoError(t, err)

	b, err := os.ReadFile("test.wasm")
	require.NoError(t, err)

	err = host.LoadPlugin(b)
	require.NoError(t, err)

	return host, fns, pb, hook
}

// TestRegularMethods tests regular method calls
func TestRegularMethods(t *testing.T) {
	ctx := context.Background()
	_, fns, _, hook := newHost(t)

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
	_, fns, _, _ := newHost(t)

	count := 50 // 100ms * 50 * 2 threads = ~2.5s

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

func TestProtobufInterop(t *testing.T) {
	ctx := context.Background()
	_, fns, pb, hook := newHost(t)

	oneof := &events.OneOf{}
	err := proto.Unmarshal(protoMessage, oneof)
	require.NoError(t, err)

	dataView, err := pb.SendMessage(ctx, oneof)
	require.NoError(t, err)
	fmt.Println(hook.LastEntry())

	result, err := fns.validatePBMessage(ctx, dataView)
	require.NoError(t, err)
	require.Equal(t, result, int32(1))

	pb.FreeMessage(ctx, dataView)
}

func TestParallelProtobufInteropExecution(t *testing.T) {
	ctx := context.Background()
	_, fns, pb, hook := newHost(t)

	count := 50000

	oneof := &events.OneOf{}
	err := proto.Unmarshal(protoMessage, oneof)
	require.NoError(t, err)

	wg := sync.WaitGroup{}
	wg.Add(count)

	for i := 0; i < count; i++ {
		go func() {
			dataView, err := pb.SendMessage(ctx, oneof)
			require.NoError(t, err)
			if len(hook.AllEntries()) > 0 {
				fmt.Println(hook.LastEntry())
			}

			result, err := fns.validatePBMessage(ctx, dataView)
			require.NoError(t, err)
			require.Equal(t, result, int32(1))

			pb.FreeMessage(ctx, dataView)
			wg.Done()
		}()
	}

	wg.Wait()

}
