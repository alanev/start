var gulp = require('gulp'),
	del = require('del'),
	flatten = require('gulp-flatten'),
	imagemin = require('gulp-imagemin'),
	webp = require('gulp-webp')
	;

// paths
var paths = require('./paths');

// task
var tasks = {
	min: function () {
		gulp.src(paths.img.src)
			.pipe(flatten())
			.pipe(imagemin({
				optimizationLevel: 5,
				progressive: true
			}))
			.pipe(gulp.dest(paths.img.dest))
			;
	},
	clean: function () {
		del([
			paths.img.dest + '**',
			paths.img.dest
		]);
	},
	copy: function () {
		gulp.src(paths.img.src)
			.pipe(flatten())
			.pipe(gulp.dest(paths.img.dest))
			;
	},
	webp: function () {
		gulp.src(paths.img.src)
			.pipe(flatten())
			.pipe(webp())
			.pipe(gulp.dest(paths.img.dest))
			;
	}
};

// module
module.exports = tasks;