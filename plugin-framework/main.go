package main

import (
	"os"

	"github.com/gogo/protobuf/jsonpb"
	"github.com/gravitational/teleport-plugins/lib/logger"
	"github.com/gravitational/teleport-plugins/lib/wasm"
	_ "github.com/gravitational/teleport/api/types"
	"github.com/gravitational/teleport/api/types/events"
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

	e := &events.OneOf_UserCreate{UserCreate: &events.UserCreate{}}
	m := jsonpb.Marshaler{}
	log.Println(m.MarshalToString(&events.OneOf{Event: e}))

	err = host.Test()
	if err != nil {
		log.Fatal(err)
	}
}
