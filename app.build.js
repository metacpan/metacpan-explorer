({
  baseUrl: "app/scripts",
  out: "build/app.js",
  name: "../inc/almond",
  include: ["app"],
  insertRequire: ["app"],
  mainConfigFile: "app/scripts/app.js",
  // optimize: "none",
  wrap: true
})
