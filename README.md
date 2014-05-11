metacpan-explorer
=================

## Adding Examples


Login using the credentials from https://github.com/CPAN-API/metacpan-credentials/blob/master/github and go to https://gist.github.com/.
Create a new **public** gist with the following file structure:

* endpoint.txt

Contains the path to the API endpoint (e.g. `/v0/author/_search`)

* body.json

Contains the JSON encoded body of the request. Can be `null` if the request has no body.

Give the gist a useful description and save. The example should then show up on explorer.metacpan.org

## Rebuilding the static files

Make sure you have [node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

In the project root run

    ./build.sh

It will install dependencies via npm
and regenerate the static files into the `build` directory.
