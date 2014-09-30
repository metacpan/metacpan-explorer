define([
  "jquery",
  "underscore",
  "backbone",
  "tpl!template/settings.htm",
  "bootstrap-modal"
], function($, _, Backbone, template){
  return Backbone.View.extend({
    tagName: 'div',
    id: 'settings',
    template: template,

    events: {
      "change input[type=checkbox]": "toggleCheckbox",
      "click .cancel": "hide",
      "click .save": "save"
    },

    checkbox: function(name) {
      return '<input name="' + name + '" type="checkbox" ' + (this.model.get(name) ? "checked" : "") + '/>';
    },

    bsmodal: function(arg) {
      this.$modal.modal(arg);
    },

    render: function(options) {
      this.changes = {};
      this.$el.html(this.template(_.extend({
        checkbox: _.bind(this.checkbox, this),
        model: this.model.toJSON()
      }, options)));
      this.$modal = $('#settings .modal');
      this.$toggle = $('.settings-toggle');
      return this;
    },

    toggleCheckbox: function(e) {
      var $el = $(e.target),
          name = $el.attr('name') || $el.attr('id');
      this.changes[name] = $el.prop('checked');
    },

    save: function(){
      this.model.save(this.changes);
      this.hide();
    },

    hide: function() {
      this.$toggle.removeClass('open');
      this.bsmodal('hide');
    },
    show: function() {
      // Reset form elements to current settings.
      this.render();
      this.$toggle.addClass('open');
      this.bsmodal();
    }
  });
});
