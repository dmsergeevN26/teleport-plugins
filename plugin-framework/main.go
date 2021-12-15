package main

import (
	"os"

	"github.com/gravitational/teleport-plugins/lib/logger"
	"github.com/gravitational/teleport-plugins/lib/wasm"
)

func main() {
	logger.Init()
	log := logger.Standard()

	host, err := wasm.NewHost(wasm.Options{
		Compiler: wasm.CRANELIFT,
		Logger:   log,
	})

	if err != nil {
		log.Fatal(err)
	}

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
