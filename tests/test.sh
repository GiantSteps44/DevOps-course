#!/bin/sh
set -eu

# Waits containers to start, before starting testing.
wait_for_url () {
    echo "Testing $1..."
    printf 'GET %s\nHTTP 200' "$1" | hurl --retry "$2" > /dev/null;
    return 0
}


echo "Starting container"

echo "Waiting server to be ready"
wait_for_url "$1" 60

echo "Running all of the Hurl tests"
hurl --variable host="$1" --test tests/*.hurl

echo "Stopping container"
docker stop testing