var gulp = require('gulp'),
	watch = require('gulp-watch');

// paths
var paths = require('./paths');

// task
var task = function () {
	
	watch([paths.html.src, paths.src + '**/*.htm'], function () {
		gulp.start('html');
	});

	watch(paths.src + '**/*.{css,scss}', function () {
		gulp.start('css');
	});
	watch(paths.src + '**/*.js', function () {
		gulp.start('js');
	});
	
	watch(paths.img.src, function () {
		gulp.start('img');
	});
	
	watch(paths.sprite.src, function () {
		gulp.start('sprite');
	});
	
	watch('config.json', function () {
		gulp.start('modules');
	})
};

// module
module.exports = task;