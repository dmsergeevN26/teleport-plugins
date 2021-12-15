package wasm

import (
	"time"

	"github.com/gogo/protobuf/proto"
	"github.com/gravitational/teleport/api/types/events"
)

// TODO -> fixtures_defaults.go
var defaults = map[string]proto.Message{
	"events.UserCreate": events.MustToOneOf(
		&events.UserCreate{
			Metadata: events.Metadata{
				Index:       1,             // global counter ??? +1 from last ??? reflect it ???
				Type:        "user.create", // Those constants are buried in events api
				ID:          "",            // random UUID
				ClusterName: "test-cluster",
				Time:        time.Now(), // +1 second ???
			},
		},
	),
}

// -> fixtures_defaults.go
//func GenerateProtoMessage()

// FixtureIndex represents the index of a json-encoded protobuf messages
type FixtureIndex struct {
	fixtures map[string]proto.Message
	index    int
}

// NewFromDir reads fixtures from directory and unmarshals them to the proto.Message
func (f *FixtureIndex) NewFromDir(path string) error {
	return nil
}

// Get
func (f *FixtureIndex) Get(id string, m *proto.Message) error {
	return nil
}

func (f *FixtureIndex) Set(id string, m *proto.Message) error {
	return nil
}

func (f *FixtureIndex) Has(id string) bool {
	return false
}
