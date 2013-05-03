define(["backbone"], function(Backbone) {
	return Backbone.Collection.extend({
		/**
		 * Sets the `active` attribute of all models but `model` to `false`.
		 * Triggers the `active` event with the `model` passed as first parameter.
		 * 
		 * @param {App.Model} model   Model that is set to active
		 * @param {Object} options 	Options that are passed to `set` such as `{ silent: true }`
		 * @return {App.Model}	returns `model`
		 */
		setActive: function(model, options) {
			_.invoke(this.without(model), "set", "active", false, options);
			model.set("active", true, options);
			options = options || {};
			return model;
		},
		/**
		 * Get active model of collection
		 * 
		 * @return {App.Model}	Returns a model of one is active.
		 */
		getActive: function() {
			return this.find(function(model) { return model.isActive() });
		},
		/**
		 * Calls fetch on all models and returns a $.Deferred object that resolves
		 * when all models have been fetched.
		 * 
		 * @return {$.Deferred}
		 */
		fetchAll: function() {
			var self = this;
			return $.when.apply($, this.invoke("fetch")).pipe(function(){return self});
		}
	});
});