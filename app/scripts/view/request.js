define([
  "underscore",
  "view",
  "view/dragbar",
  "settings",
  "behave",
  "highlight",
  "tpl!template/request.htm",
  "bootstrap-dropdown"
], function(_, View, DragBar, settings, Behave, hljs, template) {
  /*jslint unparam: true*/ // A lot of event callbacks in here.
  return View.extend({
    name: "request",
    template: template,

    events: {
      "keydown textarea": function(e) {
        // Shift + Enter to send request.
        // NOTE: Our copy of behave has an edit on line 441 to disable behave's
        // enterKey functionality when shift is pressed.
        // Behave offers hooks for keydown as well as enter:before but they both
        // fire after behave's enterKey function has started, so I think it's
        // too late... I think we're stuck with the edit.
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
      this.listenTo(this.model, {
        // Use special pending event not only for the start, but also
        // to ensure we get the event even if the response doesn't *change*.
        "change:response":  this.updateResponse,
        "change:body":      this.onChangeBody,
        "pending":          this.updatePendingIndicator
      });
      this.listenTo(settings, {
        'change:editorFeatures':    this.onChangeEditorFeatures,
        'change:highlightResponse': this.updateResponse,
        'change:wrapLines':         this.onChangeWrapLines,
        'change:instantValidation': this.onChangeInstantValidation
      });
    },

    updatePendingIndicator: function (pending) {
      this.$resbox.toggleClass('pending', pending);
    },
    updateResponse: function() {
      var res = _.escape(this.model.get("response"));
      this.$response.html(res);
      if( settings.get('highlightResponse') ){
        hljs.highlightBlock(this.$response.get(0));
      }
    },

    render: function() {
      View.prototype.render.apply(this, arguments);
      this.$label = this.$(".editor .label").hide();
      this.$body = this.$("textarea");
      this.$resbox   = this.$('.response');
      this.$response = this.$('pre code');

      this.dragbar = (new DragBar({
        container: this.$('.request-inner'),
        left:  this.$('.editor'),
        right: this.$resbox,
        el:    this.$('.dragbar')
      })).render();

      this.setEditorFeatures(settings.get('editorFeatures'));
      this.setWrapLines(settings.get('wrapLines'));

      this.updateResponse();
      return this;
    },

    onChangeEditorFeatures: function(m, val, o){ this.setEditorFeatures(val); },
    setEditorFeatures: function(enabled) {
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
    },

    onChangeWrapLines: function(m, val, o) { this.setWrapLines(val); },
    setWrapLines: function(wrap) {
      this.$response.toggleClass('wrap', wrap);
    }
  });
});
