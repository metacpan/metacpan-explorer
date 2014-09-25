define(["view"], function(View) {
  return View.extend({
    tagName: "li",
    name: "list-item",
    template: _.template("<a href='#/<%- model.id %>''><%- model.description || model.id %></a>"),
    events: {
      "click a": function() { this.model.setActive() }
    }
  });
});
