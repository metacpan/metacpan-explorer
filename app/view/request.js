define([
	"view",
	"behave",
	"sh",
	"bootstrap-dropdown"
], function(View, Behave, hljs) {
	return View.extend({
		name: "request",
		events: {
			"keydown textarea": function(e) {
				this.model.set("body", this.$body.val());
				if((e.keyCode || e.which) === 13 && e.shiftKey === true) {
					this.model.request();
					return false;
				}
			},
			"keyup textarea": "validateBody"
		},
		validateBody: function() {
			var json = this.$body.val();
			try {
				!json || JSON.parse(json);
				this.$label.hide();
			} catch(e) {
				this.$label.show();
			}
		},
		initialize: function() {
			this.listenTo(this.model, "change:response", this.updateResponse);
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
			new Behave({
				textarea: this.$("textarea").get(0),
				tabSize: 2
			});
			this.updateResponse();
			return this;
		}
	});
});
