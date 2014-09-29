define(["model/settings"], function(Settings) {
  var settings = new Settings();
  settings.fetch();
  return settings;
});
