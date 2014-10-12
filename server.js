#!/usr/bin/env node

var fs = require('fs');
var Static = require('node-static');

var startServer = function(dir, port) {
  console.log("Serving", dir, 'on port', port);

  var httpd = new Static.Server(dir, {
    headers: {
      "Cache-Control": "no-cache, must-revalidate"
    }
  });

  require('http').createServer(function (request, response) {
    request.addListener('end', function () {

      httpd.serve(request, response);

    }).resume();
  }).listen(port);
};

var port = process.env.PORT || 8080;

// 0: node, 1: server.js, 2: first arg
var dir = process.argv[2] || 'app';

fs.stat(dir, function(err, stats){
  if( err || !stats.isDirectory() ){
    throw(dir + " is not a directory");
  }
  startServer(dir, port);
});
