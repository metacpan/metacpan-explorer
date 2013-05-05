define(["view", "view/navbar-item"], function(View, ItemView) {
	return View.extend({
		loading: 0,
		loadingInterval: null,
		name: "navbar",
		attributes: {
			"class": "navbar navbar-static-top"
		},
		initialize: function() {
			this.listenTo(this.model, "load:start", this.startLoading);
			this.listenTo(this.model, "load:end", this.endLoading);
		},
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
		},
		startLoading: function() {
			if(!this.loading) {
				this.loadingInterval = window.setInterval(_.bind(this.animateLogo, this), 2000);
				_.defer(_.bind(this.animateLogo, this));
			}
			this.loading++;
		},
		endLoading: function() {
			this.loading--;
			if(!this.loading)
				window.clearInterval(this.loadingInterval);
		},
		animateLogo: function() {
			var ll = this.$(".ll"),
				lr = this.$(".lr"),
				ur = this.$(".ur"),
				ul = this.$(".ul");
			ll.toggleClass("ll ul");
			lr.toggleClass("lr ll");
			ur.toggleClass("ur lr");
			ul.toggleClass("ul ur");
		}
	});
});
