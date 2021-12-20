package main

import (
	"os"

	"github.com/gravitational/kingpin"
	"github.com/gravitational/teleport-plugins/lib/logger"
	"github.com/gravitational/teleport-plugins/lib/wasm"
	_ "github.com/gravitational/teleport/api/types"
	"github.com/sirupsen/logrus"
)

var (
	app  = kingpin.New("plugin-framework", "WASM plugin framework app")
	test = app.Command("test", "Run tests")

	fixture         = app.Command("fixture", "Generate fixture")
	fixtureTemplate = fixture.Arg("template", "Fixture template name").Required().String()
	fixtureName     = fixture.Arg("name", "Fixture name").Required().String()
)

func runTest(host *wasm.Host, log logrus.FieldLogger) {
	b, err := os.ReadFile("build/test.wasm")
	if err != nil {
		log.Fatal(err)
	}

	err = host.LoadPlugin(b)
	if err != nil {
		log.Fatal(err)
	}

	err = host.Test()
	if err != nil {
		log.Fatal(err)
	}
}

func genFixture(host *wasm.Host, log logrus.FieldLogger, template string, name string) {
	err := host.FixtureIndex.Add(template, name)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Fixture generated")
}

func main() {
	logger.Init()
	log := logger.Standard()

	host, err := wasm.NewHost(wasm.Options{
		Compiler:   wasm.CRANELIFT,
		Logger:     log,
		Test:       true,
		FixtureDir: "fixtures",
	})

	if err != nil {
		log.Fatal(err)
	}

	switch kingpin.MustParse(app.Parse(os.Args[1:])) {
	case test.FullCommand():
		runTest(host, log)
	case fixture.FullCommand():
		genFixture(host, log, *fixtureTemplate, *fixtureName)
	}

}
