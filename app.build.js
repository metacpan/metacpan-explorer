({
  baseUrl: "app",
  out: "build/app.js",
  name: "../inc/almond",
  include: ["app"],
  insertRequire: ["app"],
  mainConfigFile: "app/app.js",
  // optimize: "none",
  wrap: true
})
