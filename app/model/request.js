define(["model", "store/gist"], function(Model, Store) {
	return Model.extend({
		store: new Store(),
		defaults: {
			endpoint: null,
			body: null,
			response: null,
			active: false
		},
		getCurl: function() {
			if(!this.get("endpoint")) return "";
			var curl = "curl " + (this.get("body") ? "-XPOST " : "") +
				"'api.metacpan.org" + this.get("endpoint") + "'";
			if(this.get("body")) curl +=
				" -d \"$(curl -Ls gist.github.com/metacpan/" + this.id + "/raw/body.json)\"";
			return curl;
		},
		toJSON: function() {
			var json = Model.prototype.toJSON.apply(this, arguments);
			_.extend(json, { curl: this.getCurl() });
			return json;
		},
		parse: function(res) {
			if(!res.files) return res;
			return _.extend(res, {
				body: res.files["body.json"] && res.files["body.json"].content !== "null"
						? res.files["body.json"].content : null,
				endpoint: res.files["endpoint.txt"].content
			});
		},
		request: function(options) {
			options = options || {};
			var self = this;
			var body = this.get("body");
			return $.ajax({
				url: "//api.metacpan.org" + this.get("endpoint"),
				dataType: "text",
				type: body ? "POST" : "GET",
				data: body ? body : null
			}).then(function(res) {
				self.set({
					response: res,
					success: true
				});
				return self;
			}, function(res) {
				self.set({
					response: res.responseText,
					success: false
				});
				return self;
			}).always(function(model) {
				if(options.gist !== false && model.get("public") !== true)
					model.save().done(function(model) {
						location.hash = "/" + model.id;
					});
			});
		}
	});
});
