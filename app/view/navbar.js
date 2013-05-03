define(["view", "view/navbar-item"], function(View, ItemView) {
	return View.extend({
		name: "navbar",
		itemClass: ItemView,
		render: function() {
			var self = this;
			View.prototype.render.apply(this, arguments);
			var $list = this.$("> ul");
			if(this.model) {
				_.each(this.model.get("items"), function(item) {
					var view = self.itemClass;
					$list.append(new view({
						model: item
					}).el);
				});
			}
			return this;
		}
	});
});
