define([
  "underscore",
  "view",
  "settings",
  "behave",
  "highlight",
  "tpl!template/request.htm",
  "bootstrap-dropdown"
], function(_, View, settings, Behave, hljs, template) {
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
      "keyup textarea": "updateBody"
    },

    updateBody: function() {
      var json = this.$body.val();
      this.model.set("body", json);
    },
    validateBody: function () {
      this.setValid(this.model.isValid());
    },
    onChangeBody: function(m, body) {
      // Only update the html if the text is different,
      // since doing so can move the cursor in some browsers.
      if( body !== this.$body.val() ){
        this.$body.val(body);
      }
      if( settings.get('instantValidation') ){
        this.validateBody();
      }
    },

    initialize: function() {
      this.listenTo(this.model, "change:response", this.updateResponse);
      this.listenTo(this.model, "change:body",     this.onChangeBody);
      this.listenTo(settings, 'change:editorFeatures', this._setEditorFeatures);
      this.listenTo(settings, 'change:instantValidation', this.onChangeInstantValidation);
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
      this._setEditorFeatures(null, settings.get('editorFeatures'));
      this.updateResponse();
      return this;
    },

    _setEditorFeatures: function(m, enabled, o) {
      if( this.behave ){
        this.behave.destroy();
        this.behave = null;
      }
      if( enabled ){
        this.behave = new Behave({
          textarea: this.$body.get(0),
          tabSize: 2
        });
      }
    },

    onChangeInstantValidation: function(m, val, o){
      if( val ){
        // Initiate validation when enabled.
        this.validateBody();
      }
      else {
        // Update the display if checking is disabled.
        this.setValid(true);
      }
    },
    setValid: function(valid) {
      if( valid ){
        this.$label.hide();
      }
      else {
        this.$label.show();
      }
    }
  });
});
