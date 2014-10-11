define([
  "jquery",
  "view",
  "view/list-item",
  "tpl!template/sidebar.htm"
], function($, View, ItemView, template) {
  return View.extend({
    name: "sidebar",
    template: template,
    events: {
      "click .settings-toggle": "toggleSettings",
      "click .input": function(e) {
        $(e.target).focus().select();
      }
    },
    initialize: function(options) {
      this.listenTo(this.collection, "sync", this.render);
      this.listenTo(this.collection, "change:active", this.updateCurl);
      this.settingsView = options.settingsView;
    },
    updateCurl: function(model, value) {
      this.$("input").val(value ? model.getCurl() : "");
    },
    render: function() {
      var self = this;
      var model = this.collection.getActive();
      View.prototype.render.call(this, {
        model: model ? model.toJSON() : null
      });
      var $nav = this.$("ul.nav .examples");
      this.collection.each(function(item) {
        if(!item.id){
          return;
        }
        $nav.after(self.add(new ItemView({ model: item })).render().el);
      });
      return this;
    },
    toggleSettings: function(e) {
      e.preventDefault();
      this.settingsView.show();
    }
  });
});
