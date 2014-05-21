#!/bin/sh

rm -rf build tmp
mkdir -p build

npm install
export PATH=node_modules/.bin:$PATH

r.js -o app.build.js
lessc --yui-compress styles.less > build/styles.css

node env-filter.js < index.htm > build/index.htm
