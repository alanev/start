var server = require('gulp-connect');

// paths
var paths = require('./paths');

// settings
var config = require('../config');
var settings = {
	root: paths.dest,
	port: config.port,
	livereload: true
};

// task
var task = function () {
	server.server(settings)
}

// module
module.exports = task;