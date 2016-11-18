define([
  "underscore",
  "view",
  "tpl!template/navbar.htm",
  "bootstrap-typeahead",
  "bootstrap-tooltip"
], function(_, View, template) {
  return View.extend({
    loading: 0,
    loadingInterval: null,
    template: template,
    name: "navbar",
    attributes: {
      "class": "navbar navbar-fixed-top"
    },
    events: {
      "submit form" : function() {
        this.collection.getActive().set({
          endpoint: this.$endpoint.val()
        }).request();
        return false;
      }
    },
    initialize: function() {
      this.listenTo(this.collection, "load:start", this.startLoading);
      this.listenTo(this.collection, "load:end", this.endLoading);
      this.listenTo(this.collection, "change:active", this.render);
      this.listenTo(this.collection, "change:endpoint", this.render);
    },
    startLoading: function() {
      if(!this.loading) {
        this.loadingInterval = window.setInterval(_.bind(this.animateLogo, this), 2000);
        _.defer(_.bind(this.animateLogo, this));
      }
      this.loading++;
    },
    endLoading: function() {
      this.loading--;
      if(!this.loading){
        window.clearInterval(this.loadingInterval);
      }
    },
    animateLogo: function() {
      var ll = this.$(".ll"),
        lr = this.$(".lr"),
        ur = this.$(".ur"),
        ul = this.$(".ul");
      ll.toggleClass("ll ul");
      lr.toggleClass("lr ll");
      ur.toggleClass("ur lr");
      ul.toggleClass("ul ur");
    },
    render: function(model) {
      model = model || this.collection.getActive();
      View.prototype.render.call(this, { model: model ? model.toJSON() : {} });
      this.$endpoint = this.$("input").typeahead({
        source: [
          "/v1/file",
          "/v1/author",
          "/v1/release",
          "/v1/distribution",
          "/v1/module",
          "/v1/favorite",
          "/v1/rating"
        ]
      });
      this.$("button").tooltip({ placement: "bottom", trigger: "hover", container: "body" });
      return this;
    }
  });
});
