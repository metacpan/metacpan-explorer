#!/usr/bin/env node

// NOTE: You should get the github token from the private conf repo
// and export it as GITHUB_TOKEN before running this server.

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

      if (request.url === '/github.js') {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end('function github_token () { return ' + JSON.stringify(process.env.GITHUB_TOKEN || 'token') + '; }');
      }
      else {
        httpd.serve(request, response);
      }

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
