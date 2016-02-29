var gulp = require('gulp'),
	watch = require('gulp-watch');

// paths
var paths = require('./paths');

// task
var task = function () {
	
	watch([paths.modules + '**/*.htm', paths.src + '*.htm'], function () {
		gulp.start('html');
	});
    
	watch([paths.modules + '**/*.{scss,css}', paths.src + '*.css'], function () {
		gulp.start('css');
	});
    
	watch([paths.modules + '**/*.js', paths.src + '*.js'], function () {
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