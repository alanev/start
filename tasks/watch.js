var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sync = require('run-sequence');

// paths
var paths = require('./paths');

// task
var task = function () {
	
	watch([paths.modules + '**/*.htm', paths.src + '*.htm'], function () {
		sync('html', 'test:html');
	});
    
	watch([paths.modules + '**/*.{scss,css}', paths.src + '*.css'], function () {
		sync('css');
	});
    
	watch([paths.modules + '**/*.js', paths.src + '*.js'], function () {
		sync('js', 'test:js');
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