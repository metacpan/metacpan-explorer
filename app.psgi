use Plack::Builder;
use strict;
use warnings;
use Plack::App::Directory;
builder {
	mount "/" => builder {
		enable "Plack::Middleware::DirIndex", dir_index => 'index.htm';
		mount "/" => Plack::App::Directory->new({ root => "app" })->to_app;
	};
};
