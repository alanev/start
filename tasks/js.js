// modules
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	
	// utils
	plumber = require('gulp-plumber'),
	beep = require('./beep'),
	concat = require('gulp-concat'),
	
	// js
	babel = require('gulp-babel'),
	uglify = require('gulp-uglify')
	;

// paths
var paths = require('./paths');

// task
var tasks = {
	dev: function () {
		gulp.src(paths.js.src)
			.pipe(plumber(beep))
			.pipe(concat(paths.js.name))
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(plumber.stop())
			.pipe(gulp.dest(paths.dest))
			.pipe(connect.reload())
			;
	},
	build: function () {
		gulp.src(paths.js.src)
			.pipe(plumber(beep))
			.pipe(concat(paths.js.name))
			.pipe(babel({
				presets: ['es2015']
			}))
			.uglify()
			.pipe(plumber.stop())
			.pipe(gulp.dest(paths.dest))
			.pipe(connect.reload())
			;
	}
}

// module
module.exports = tasks;