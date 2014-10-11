define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
  return Backbone.Model.extend({
    /**
     * Returns a human readable description of the model. It is used
     * in the progress bar as subtitle.
     *
     * TODO: localize, i.e. return object with titles for all languages.
     *
     * @return {String}
     */
    getTitle: function() {
      var title = this.get("title");
      return _.isObject(title) ? title[languageSelectGlobal] : title;
    },

    /**
     * Calls `setActive(model, options)` on the collection.
     *
     * @param {options} options
     */
    setActive: function(options) {
      if(!this.collection){ return this; }
      return this.collection.setActive(this, options);
    },
    /**
     * Returns true if model is active.
     *
     * @return {Boolean}
     */
    isActive: function() {
      return !!this.get("active");
    },
    sync: function(method, model, options) {
      var store = model.store || model.collection.store;
      return store ? store.sync.apply(store, arguments) : $.when();
    }
  });
});
