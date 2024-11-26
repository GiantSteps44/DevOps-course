#!/bin/sh
set -eu

wait_for_url () {
    echo "Testing $1..."
    printf 'GET %s\nHTTP 200' "$1" | hurl --retry "$2" > /dev/null;
    return 0
}

echo "Starting container"
docker run --name testing --rm --detach --publish 8200:8200 ghcr.io/jcamiel/hurl-express-tutorial:latest

echo "Waiting server to be ready"
wait_for_url "$1" 10

echo "Running Hurl tests"
hurl --variable host="$1" --test tests/*.hurl

echo "Stopping container"
docker stop testing