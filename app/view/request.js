define([
	"view",
	"view/navbar-item",
	"behave",
	"sh",
	"bootstrap-dropdown",
	"bootstrap-typeahead"
], function(View, ItemView, Behave, hljs) {
	return View.extend({
		name: "request",
		events: {
			"click .endpoint .dropdown-menu a": function(e) {
				this.$("input").val($(e.target).text());
			},
			"submit form" : function(e) {
				this.model.set({
					body: this.$body.val(),
					endpoint: this.$("input").val()
				}).request();
				return false;
			},
			"keyup textarea": "validateBody"
		},
		validateBody: function() {
			var json = this.$body.val();
			if(!json) {
				this.$label.hide();
				return;
			}
			try {
				JSON.parse(json);
				this.$label.hide();
			} catch(e) {
				this.$label.show();
			}
		},
		initialize: function() {
			this.listenTo(this.model, "change:response", this.updateResponse);
			this.listenTo(this.model, "change:endpoint", function() {
				this.$("input").val(this.model.get("endpoint"));
			});
			this.listenTo(this.model, "change:body", function() {
				this.$body.val(this.model.get("body"));
				this.validateBody();
			});
		},
		updateResponse: function() {
			this.$('pre').html(this.model.get("response")).each(function(i, e) {hljs.highlightBlock(e)});
		},
		render: function() {
			var self = this;
			View.prototype.render.apply(this, arguments);
			this.$label = this.$(".editor .label").hide();
			this.$body = this.$("textarea");
			this.$endpoint = this.$("input").typeahead({
				source: [
					"/v0/file",
					"/v0/author",
					"/v0/release",
					"/v0/distribution",
					"/v0/module",
					"/v0/favorite",
					"/v0/rating"
				]
			});
			new Behave({
				textarea: this.$("textarea").get(0),
				tabSize: 2
			});
			this.updateResponse();
			return this;
		}
	});
});
