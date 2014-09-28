require.config({
  baseUrl: "scripts",
  urlArgs: "bust=" + (new Date()).getTime(),
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    "bootstrap-dropdown": {
      deps: ["jquery"],
      exports: "jQuery.fn.dropdown"
    },
    "bootstrap-typeahead": {
      deps: ["jquery"],
      exports: "jQuery.fn.typeahead"
    },
    "bootstrap-tooltip": {
      deps: ["jquery"],
      exports: "jQuery.fn.tooltip"
    },
    "jquery.querystring": {
      deps: ["jquery"],
      exports: "jQuery.fn.getParam"
    },
    "highlight": {
      // https://highlightjs.org/download/
      // We can download a custom build with only JSON support (all we need).
      // Version 8.2 of highlight.js uses `var` so when requirejs emeds it in
      // a large function call it won't be available on `this`.
      // By returning the local scope var we can use the minified custom
      // download without needing to wrap or alter the file.
      init: function(){ /*global hljs*/ return hljs; },
      exports: "hljs"
    }
  },
  paths: {
    "jquery": "../inc/jquery",
    "underscore": "../inc/underscore",
    "backbone": "../inc/backbone",
    "bootstrap-typeahead": "../inc/bootstrap/js/bootstrap-typeahead",
    "bootstrap-dropdown": "../inc/bootstrap/js/bootstrap-dropdown",
    "bootstrap-tooltip": "../inc/bootstrap/js/bootstrap-tooltip",
    "jquery.querystring": "../inc/jquery.querystring",
    "behave": "../inc/behave",
    "highlight": "../inc/highlight",
    "text": "../inc/text",
    "tpl": "../inc/tpl"
  }
});

define([
    "router",
    "view/viewport",
    "view/navbar",
    "view/request",
    "view/sidebar",
    "model/request",
    "model",
    "collection",
    "jquery.querystring"
  ],
  function (router, Viewport, Navbar, RequestView, SidebarView, Request, Model, Collection) {
    $(function(){
    var viewport = new Viewport();
    $(document.body).replaceWith(viewport.render().el);

    var request = new Request({ active: true });

    var examples = window.e = new Collection([request], {
      model: Request,
      comparator: "description"
    });
    var sidebar = new SidebarView({ collection: examples });
    var navbar = new Navbar({ collection: examples });

    var fetch = examples.fetch({ remove: false });

    viewport.$el.append(
      navbar.render().el,
      sidebar.render().el,
      viewport.add(new RequestView({ model: request })).render().el
    );

    examples.bind("change:active", function(model, value) {
      if(!value) return;
      viewport.removeViews();
      viewport.$el.append(viewport.add(new RequestView({ model: model })).render().el);
    });

    examples.bind("change:id", function(model, id) {
      if(!model.isActive()) return;
      window.history.pushState(null, null, "/");
      router.navigate("//" + id);
    });

    router.on("route:load", function(id) {
      navbar.startLoading();
      fetch.then(function() {
        var model = examples.get(id) || examples.newModel(id === "new" ? null : { id: id });
        model.setActive();
        if(id !== "new")
          return model.fetch().then(function() {
            return model.request({ gist: false });
          });
      }).always(function() {
        navbar.endLoading();
      });
    }).start();

    if($.getParam("url")) {
      navbar.startLoading();
      examples.newModel().setActive().set({
        endpoint: $.getParam("url"),
        body: $.getParam("content")
      }).request().always(function() {
        navbar.endLoading();
      });
    }
    })
});
