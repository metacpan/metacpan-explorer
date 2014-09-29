define([
  "underscore",
  "view",
  "behave",
  "highlight",
  "tpl!template/request.htm",
  "bootstrap-dropdown"
], function(_, View, Behave, hljs, template) {
  return View.extend({
    name: "request",
    template: template,
    events: {
      "keydown textarea": function(e) {
        // Shift + Enter to send request.
        if((e.keyCode || e.which) === 13 && e.shiftKey === true) {
          this.model.request();
          return false;
        }
      },
      "keyup textarea": "validateBody"
    },
    validateBody: function() {
      var json = this.$body.val();
      this.model.set("body", json);
      try {
        !json || JSON.parse(json);
        this.$label.hide();
      } catch(e) {
        this.$label.show();
      }
    },
    initialize: function() {
      this.listenTo(this.model, "change:response", this.updateResponse);
      this.listenTo(this.model, "change:body", function() {
        this.$body.val(this.model.get("body"));
        this.validateBody();
      });
    },
    updateResponse: function() {
      var res = _.escape(this.model.get("response"));
      this.$response.html(res).each(function(i, e) {
        hljs.highlightBlock(e);
      });
    },
    render: function() {
      View.prototype.render.apply(this, arguments);
      this.$label = this.$(".editor .label").hide();
      this.$body = this.$("textarea");
      this.$response = this.$('pre code');
      new Behave({
        textarea: this.$("textarea").get(0),
        tabSize: 2
      });
      this.updateResponse();
      return this;
    }
  });
});
