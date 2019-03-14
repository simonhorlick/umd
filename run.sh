#!/bin/bash

# Kill tsc when this script exits.
trap 'kill $(jobs -p)' EXIT

./node_modules/.bin/tsc --watch --diagnostics &

go run server.go
