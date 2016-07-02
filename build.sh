#!/bin/sh

npm install
export PATH=`npm bin || echo node_modules/.bin`:$PATH

npm run build
