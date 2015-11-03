// modules
var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	connect = require('gulp-connect'),
	
	postcss = require('gulp-postcss'),
	postxml = require('gulp-postxml'),
	plugins = [
		require('postxml-import')({
			selector: 'import[module]',
			attr: 'module',
			path: function (block) {
				return 'modules/' + block + '/' + block + '.htm';
			}
		}),
		require('postxml-beml')(),
		require('postxml-imgalt')(),
		require('postxml-placeholder')(),
		require('postxml-image-size')({
			cwd: 'cwd'
		}),
		require('postxml-wrap')(),
		require('postxml-repeat')()
	]
	;

// paths
var paths = require('./paths');

// task
var task = function () {
	return gulp.src(paths.html.src)
		.pipe(plumber())
		.pipe(postxml(plugins))
		.pipe(plumber.stop())
		.pipe(gulp.dest(paths.html.dest))
		.pipe(connect.reload())
		;
}

// module
module.exports = task;