require.config({
  baseUrl: "app",
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
    "sh": {
      exports: "hljs"
    }
  },
  paths: {
    jquery: "../inc/jquery",
    underscore: "../inc/underscore",
    backbone: "../inc/backbone",
    "bootstrap-typeahead": "../inc/bootstrap/js/bootstrap-typeahead",
    "bootstrap-dropdown": "../inc/bootstrap/js/bootstrap-dropdown",
    "bootstrap-tooltip": "../inc/bootstrap/js/bootstrap-tooltip",
    "behave": "../inc/behave",
    "sh": "../inc/highlight"
  }
});

requirejs([
    "router",
    "view/viewport",
    "view/navbar",
    "view/request",
    "view/Sidebar",
    "model/request",
    "model",
    "collection"
  ],
  function (router, Viewport, Navbar, RequestView, SidebarView, Request, Model, Collection) {

    var viewport = new Viewport();
    $(document.body).replaceWith(viewport.render().el);

    var request = new Request();

    var examples = window.e = new Collection([request], {
      model: Request,
      comparator: "description"
    });
    var sidebar = viewport.add(new SidebarView({ collection: examples }));
    var navbar = viewport.add(new Navbar({ collection: examples }));

    var fetch = examples.fetch();

    viewport.$el.append(
      navbar.render().el,
      sidebar.render().el
    );

    examples.bind("change:active", function(model, value) {
      if(!value) return;
      if(viewport.requestView) viewport.requestView.remove();
      viewport.requestView = viewport.add(new RequestView({ model: model }));
      viewport.$el.append(viewport.requestView.render().el);
    });

    request.set("active", true);

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
});
