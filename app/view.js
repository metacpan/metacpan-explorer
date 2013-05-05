define(["backbone"], function(Backbone) {
	return Backbone.View.extend({
		constructor: function(options) {
			options = options || {};
			var name = this.name || options.name;
			if(!this.template && name) {
				var template = $("#template-" + name).html();
				if(template) this.template = _.template(template);
			}
			if(this.name && (!this.attributes || !this.attributes.class)) {
				this.attributes = _.extend(
					this.attributes || {},
					{ "class": name }
				);
			}
			if(options.model)
				this.listenTo(options.model, "change:active", function(model, value) {
					this.$el.toggleClass("active", value);
				});
			Backbone.View.apply(this, arguments);
		},
		triggerSelect: function() {
			this.trigger("select", this.model);
		},
		proxy: function(from, event) {
			return from.bind(event, _.bind(this.trigger, this, event));
		},
		append: function() {
			this.$el.append.apply(this.$el, arguments);
		},
		render: function(options) {
			var template = this.options.template || this.template;
			options = _.extend({
				model: this.model ? this.model.toJSON() : {},
				collection: this.collection ? this.collection.toJSON() : {}
			}, options || {});
			if(template) this.$el.html(template(options));
			return this;
		}
	});
});