// modules
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	
	// utils
	gutil = require('gulp-util'),
	buffer = require('vinyl-buffer'),
	source = require('vinyl-source-stream'),
	
	// js
	browserify = require('browserify'),
	uglify = require('gulp-uglify')
	;

// paths
var paths = require('./paths');

// task
var tasks = function () {
	return browserify(paths.src + 'app/app.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(gutil.env.production ? buffer() : gutil.noop())
		.pipe(gutil.env.production ? uglify() : gutil.noop())
		.pipe(gulp.dest(paths.dest))
		.pipe(connect.reload())
		;
}

// module
module.exports = tasks;