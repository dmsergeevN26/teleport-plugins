VERSION=8.0.5

OS ?= $(shell go env GOOS)
ARCH ?= $(shell go env GOARCH)
TERRAFORM_ARCH=$(OS)_$(ARCH)

LOCALDIR := $(dir $(CURDIR)/$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST)))
BUILDDIR ?= build

CUSTOM_WASMER_RUNTIME_DIR ?=
ADDFLAGS ?=
BUILDFLAGS ?= $(ADDFLAGS) -ldflags "-w -s -X main.Sha=`git rev-parse HEAD` -X main.Version=$(VERSION)" 
CGOFLAG ?= CGO_ENABLED=1

CUSTOM_WASMER_RUNTIME_DIR = $(LOCALDIR)/wasmer-go
CUSTOM_WASMER_RUNTIME_CGO_CFLAGS ?= "-I$(CUSTOM_WASMER_RUNTIME_DIR)/wasmer/packaged/include/"
CUSTOM_WASMER_RUNTIME_CGO_LDFLAGS ?= "-Wl,-rpath,$(CUSTOM_WASMER_RUNTIME_DIR)/target/release/ -L$(CUSTOM_WASMER_RUNTIME_DIR)/target/release/ -lwasmer_go"
CUSTOM_WASMER_RUNTIME_TAGS ?= --tags custom_wasmer_runtime 

.PHONY: get-wasmer-custom-runtime
get-wasmer-custom-runtime:
	git clone git@github.com:wasmerio/wasmer-go.git && cd wasmer-go && cargo build --release && cd ..

# Use this step in case you have M1
.PHONY: build-with-wasmer-custom-runtime
build-with-wasmer-custom-runtime: clean
	GOOS=$(OS) GOARCH=$(ARCH) $(CGOFLAG) CGO_CFLAGS=$(CUSTOM_WASMER_RUNTIME_CGO_CFLAGS) CGO_LDFLAGS=$(CUSTOM_WASMER_RUNTIME_CGO_LDFLAGS) go build -o $(BUILDDIR)/plugin-framework $(BUILDFLAGS) $(CUSTOM_WASMER_RUNTIME_TAGS)

.PHONY: build
build: clean
	GOOS=$(OS) GOARCH=$(ARCH) $(CGOFLAG) CGO_CFLAGS=$(CGO_CFLAGS) CGO_LDFLAGS=$(CGO_LDFLAGS) go build -o $(BUILDDIR)/plugin-framework $(BUILDFLAGS) $(TAGS)

.PHONY: clean
clean:
	go clean
	