package main

import (
	"context"
	"os"
	"time"

	"github.com/gravitational/kingpin"
	"github.com/gravitational/teleport-plugins/lib/logger"
	"github.com/gravitational/teleport-plugins/lib/wasm"
	_ "github.com/gravitational/teleport/api/types"
	"github.com/sirupsen/logrus"
)

const (
	defaultConcurrency = 4
	defaultTimeout     = time.Second * 30
)

var (
	app  = kingpin.New("plugin-framework", "WASM plugin framework app")
	test = app.Command("test", "Run tests")

	fixture         = app.Command("fixture", "Generate fixture")
	fixtureTemplate = fixture.Arg("template", "Fixture template name").Required().String()
	fixtureName     = fixture.Arg("name", "Fixture name").Required().String()
)

func runTest(host *wasm.Host, testRunner *wasm.TestRunner, log logrus.FieldLogger) {
	b, err := os.ReadFile("build/test.wasm")
	if err != nil {
		log.Fatal(err)
	}

	err = host.LoadPlugin(b)
	if err != nil {
		log.Fatal(err)
	}

	err = testRunner.Run(context.Background())
	if err != nil {
		log.Fatal(err)
	}
}

func genFixture(testRunner *wasm.TestRunner, log logrus.FieldLogger, template string, name string) {
	err := testRunner.FixtureIndex.Add(template, name)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Fixture generated")
}

func main() {
	logger.Init()
	log := logger.Standard()

	host := wasm.NewHost(context.Background(), defaultTimeout, defaultConcurrency)

	testRunner, err := wasm.NewTestRunner(host, "fixtures")
	if err != nil {
		log.Fatal(err)
	}

	err = host.RegisterModule(testRunner)
	if err != nil {
		log.Fatal(err)
	}

	env := wasm.NewAssemblyScriptEnv(host, log)
	err = host.RegisterModule(env)
	if err != nil {
		log.Fatal(err)
	}

	// var x []string = make([]string, 0)
	// b, _ := proto.Marshal(testRunner.FixtureIndex.Get(1))
	// for _, i := range b {
	// 	x = append(x, strconv.Itoa(int(i)))
	// }
	// fmt.Println(strings.Join(x, ","))

	switch kingpin.MustParse(app.Parse(os.Args[1:])) {
	case test.FullCommand():
		runTest(host, testRunner, log)
	case fixture.FullCommand():
		genFixture(testRunner, log, *fixtureTemplate, *fixtureName)
	}

}
