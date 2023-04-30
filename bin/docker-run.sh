#!/bin/bash

set -eux

docker run --rm -it -v "$PWD:/usr/src/app" -p 8080:8080 metacpan/metacpan-explorer:latest
