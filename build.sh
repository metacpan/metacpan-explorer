#!/bin/sh

rm -rf build tmp
mkdir -p build

npm install
export PATH=node_modules/.bin:$PATH

r.js -o app.build.js
lessc --yui-compress app/styles/main.less > build/styles.css

node env-filter.js < app/index.html > build/index.html
