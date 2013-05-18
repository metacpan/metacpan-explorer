rm -rf build tmp
mkdir -p build
r.js -o app.build.js
lessc --yui-compress styles.less > build/styles.css
cp index.build.htm build/index.htm
