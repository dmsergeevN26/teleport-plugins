/*
Copyright 2015-2021 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package main

import (
	"io"
	"strings"

	"github.com/alecthomas/kong"
	"github.com/gravitational/trace"
	"github.com/pelletier/go-toml"
)

var (
	// Section names
	sections = map[string]string{
		"fluentd":  "forward.fluentd",
		"teleport": "teleport",
		"lock":     "lock",
		"wasm":     "wasm",
	}
)

// KongTOMLResolver is the kong resolver function for toml configuration file
func KongTOMLResolver(r io.Reader) (kong.Resolver, error) {
	config, err := toml.LoadReader(r)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// ResolverFunc reads configuration variables from the external source, TOML file in this case
	var f kong.ResolverFunc = func(context *kong.Context, parent *kong.Path, flag *kong.Flag) (interface{}, error) {
		name := flag.Name

		value := config.Get(name)
		if value != nil {
			return value, nil
		}

		for k, v := range sections {
			if strings.HasPrefix(name, k+"-") {
				name = strings.Join([]string{v, name[len(k)+1:]}, ".")
			}
		}

		value = config.Get(name)
		return value, nil
	}

	return f, nil
}
