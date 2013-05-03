require.config({
  baseUrl: "app",
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
    "behave": "../inc/behave",
    "sh": "../inc/highlight"
  }
});

requirejs([
  "view/viewport",
  "view/navbar",
  "view/request",
  "model/request",
  "model",
  "collection"],
function   (Viewport, Navbar, RequestView, Request, Model, Collection) {
    var viewport = new Viewport();
    $(document.body).replaceWith(viewport.render().el);
    var navbar = new Navbar({
      model: new Model({
        title: "Title"
      })
    });
    viewport.$el.append(navbar.render().el);

    var request = new Request();
    request.bind("change", function() {console.log(arguments)})

    var requestView = new RequestView({
      model: request,
      collection: new Collection([{}])
    });
    viewport.$el.append(requestView.render().el);

    var id;
    if(id = location.hash.replace(/^#?\/(\w+)$/, "$1")) {
      request.id = id;
      request.fetch().done(function() {
        request.request({ gist: false })
      });
    }

      
});
