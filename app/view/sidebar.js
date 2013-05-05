define(["view", "view/list-item"], function(View, ItemView) {
	return View.extend({
		name: "sidebar",
		events: {
			"click .input": function(e) {
				$(e.target).focus().select();
			}
		},
		initialize: function() {
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.collection, "reset", this.render);
		},
		render: function() {
			View.prototype.render.apply(this, arguments);
			var $nav = this.$nav = this.$("ul.nav");
			this.collection.each(function(item) {
				$nav.append(new ItemView({ model: item }).render().el);
			});
			return this;
		}
	});
});
