package wasm

import (
	"io/ioutil"
	"os"
	"path"
	"testing"

	"github.com/gravitational/teleport/api/types/events"
	"github.com/stretchr/testify/require"
)

func TestFixtureBuilderContext(t *testing.T) {
	c, err := newFixutreBuilderContext()
	require.NoError(t, err)

	f, err := c.Get("events.user_create.json")
	require.NoError(t, err)

	msg, err := f.GetProtoMessage()
	require.NoError(t, err)

	oneof := msg.(*events.OneOf)
	require.NotNil(t, oneof)

	evt, err := events.FromOneOf(*oneof)
	require.NoError(t, err)

	userCreate := evt.(*events.UserCreate)
	require.NotNil(t, userCreate)

	require.Equal(t, userCreate.UserMetadata.Login, "foo")
	require.NotEmpty(t, userCreate.Metadata.ID)
}

func TestFixtureIndex(t *testing.T) {
	c, err := newFixutreBuilderContext()
	require.NoError(t, err)

	f, err := c.Get("events.user_create.json")
	require.NoError(t, err)

	b, err := f.ToJSON()
	require.NoError(t, err)

	dir, err := ioutil.TempDir(os.TempDir(), "test-fixtures")
	require.NoError(t, err)
	defer os.RemoveAll(dir)

	ioutil.WriteFile(path.Join(dir, "1-user_create.json"), b, 0777)
	ioutil.WriteFile(path.Join(dir, "2-user_create.json"), b, 0777)
	ioutil.WriteFile(path.Join(dir, "5-user_create.json"), b, 0777)
	ioutil.WriteFile(path.Join(dir, "6abc-create-user.json"), b, 0777)
	ioutil.WriteFile(path.Join(dir, "zzz-create-user.json"), b, 0777)

	i, err := NewFixtureIndex(dir)
	require.NoError(t, err)

	require.NotNil(t, i.Get(1))
	require.NotNil(t, i.Get(2))
	require.NotNil(t, i.Get(5))
	require.Nil(t, i.Get(12))
	require.Nil(t, i.Get(6))

	require.NoError(t, i.Add("events.user_create", "user_create"))
	require.NotNil(t, i.Get(6))
}
