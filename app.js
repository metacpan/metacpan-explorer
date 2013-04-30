require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    }
  },
  paths: {
  	jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min",
  	underscore: "http://underscorejs.org/underscore-min",
  	backbone: "http://backbonejs.org/backbone-min"
  }
});

// Start the main app logic.
requirejs(['backbone'],
function   (Backbone) {
    console.log($);
});
