define(["view"], function(View) {
	return View.extend({
		tagName: "li",
		name: "list-item",
		events: {
			"click a": function() { this.model.setActive() }
		}
	});
});
