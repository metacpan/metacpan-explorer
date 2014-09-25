define(["backbone"], function(Backbone) {
  return new (Backbone.Router.extend({
    start: function() {
      Backbone.history.start();
    },
    routes: {
      ":id": "load"
    }
  }));
});
