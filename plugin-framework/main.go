package main

import (
	"context"
	"os"
	"time"

	"github.com/dgraph-io/badger/v3"
	"github.com/gravitational/kingpin"
	"github.com/gravitational/teleport-plugins/lib/logger"
	"github.com/gravitational/teleport-plugins/lib/wasm"
	_ "github.com/gravitational/teleport/api/types"
	"github.com/sirupsen/logrus"
)

const (
	defaultConcurrency = 1
	defaultTimeout     = time.Second * 30
)

var (
	app  = kingpin.New("plugin-framework", "WASM plugin framework app")
	test = app.Command("test", "Run tests")

	fixture         = app.Command("fixture", "Generate fixture")
	fixtureTemplate = fixture.Arg("template", "Fixture template name").Required().String()
	fixtureName     = fixture.Arg("name", "Fixture name").Required().String()
)

func runTest(pool *wasm.ExecutionContextPool, testRunner *wasm.Testing, log logrus.FieldLogger) {
	ctx := context.Background()

	c, err := pool.Get(ctx)
	if err != nil {
		log.Fatal(err)
	}

	err = testRunner.For(c).Run(ctx)
	if err != nil {
		log.Fatal(err)
	}
}

func genFixture(testRunner *wasm.Testing, log logrus.FieldLogger, template string, name string) {
	err := testRunner.FixtureIndex.Add(template, name)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Fixture generated")
}

func main() {
	logger.Init()
	log := logger.Standard()

	b, err := os.ReadFile("build/test.wasm")
	if err != nil {
		log.Fatal(err)
	}

	db, err := badger.Open(badger.DefaultOptions("").WithInMemory(true))
	if err != nil {
		log.Fatal(err)
	}

	asEnv := wasm.NewAssemblyScriptEnv(log)
	store := wasm.NewStore(wasm.NewBadgerPersistentStore(db), wasm.DecodeAssemblyScriptString)
	testing, err := wasm.NewTesting("fixtures")
	if err != nil {
		log.Fatal(err)
	}
	pb := wasm.NewProtobufInterop()
	api := wasm.NewTeleportAPI(log, testing.MockAPIClient, pb)

	opts := wasm.ExecutionContextPoolOptions{
		Timeout:     defaultTimeout,
		Concurrency: defaultConcurrency,
		Bytes:       b,
	}

	pool, err := wasm.NewExecutionContextPool(opts, asEnv, testing, store, api, pb)
	if err != nil {
		log.Fatal(err)
	}
	switch kingpin.MustParse(app.Parse(os.Args[1:])) {
	case test.FullCommand():
		runTest(pool, testing, log)
	case fixture.FullCommand():
		genFixture(testing, log, *fixtureTemplate, *fixtureName)
	}

}
