define(["view", "view/list-item"], function(View, ItemView) {
	return View.extend({
		name: "sidebar",
		events: {
			"click .input": function(e) {
				$(e.target).focus().select();
			}
		},
		initialize: function() {
			this.listenTo(this.collection, "sync", this.render);
			this.listenTo(this.collection, "change:active", this.updateCurl);
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
			var $nav = this.$nav = this.$("ul.nav");
			this.collection.each(function(item) {
				if(!item.id) return;
				$nav.append(self.add(new ItemView({ model: item })).render().el);
			});
			return this;
		}
	});
});
