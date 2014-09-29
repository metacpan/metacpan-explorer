#!/bin/sh

npm install
export PATH=node_modules/.bin:$PATH

r.js -o app.build.js
lessc --clean-css app/styles/main.less > build/styles.css

node env-filter.js < app/index.html > build/index.html
