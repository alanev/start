// modules
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	
	// utils
	concat = require('gulp-concat'),
	
	// js
	uglify = require('gulp-uglify')
	;

// paths
var paths = require('./paths');

// task
var tasks = {
	dev: function () {
		gulp.src(paths.js.src)
			.pipe(concat(paths.js.name))
			.pipe(gulp.dest(paths.dest))
			.pipe(connect.reload())
			;
	},
	build: function () {
		gulp.src(paths.js.src)
			.pipe(concat(paths.js.name))
			.uglify()
			.pipe(gulp.dest(paths.dest))
			.pipe(connect.reload())
			;
	}
}

// module
module.exports = tasks;