// modules
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	
	// utils
	buffer = require('vinyl-buffer'),
	source = require('vinyl-source-stream'),
	
	// js
	browserify = require('browserify'),
	uglify = require('gulp-uglify')
	;

// paths
var paths = require('./paths');

// task
var tasks = {};
tasks.dev = function () {
	return browserify(paths.src + 'app/app.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest(paths.dest))
		.pipe(connect.reload())
		;
}
tasks.build = function () {
	return browserify(paths.src + 'app/app.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(paths.dest))
		.pipe(connect.reload())
		;
}

// module
module.exports = tasks;