metacpan-explorer
=================

## Updating Submodules

This repo includes Bootstrap as a submodule,
so after cloning (or pulling) make sure your submodule is up to date:

    git submodule init && git submodule update

## Rebuilding the static files

In the project root run

    ./build.sh

It will install dependencies via npm
and regenerate the static files into the `build` directory.

The [developer vm](https://github.com/CPAN-API/metacpan-developer)
has everything you need for this.

To run it somewhere else you'll need to make sure you have
[node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

## Adding Examples

Login using the credentials from https://github.com/CPAN-API/metacpan-credentials/blob/master/github and go to https://gist.github.com/.
Create a new **public** gist with the following file structure:

* endpoint.txt

Contains the path to the API endpoint (e.g. `/v0/author/_search`)

* body.json

Contains the JSON encoded body of the request. Can be `null` if the request has no body.

Give the gist a useful description and save. The example should then show up on explorer.metacpan.org
