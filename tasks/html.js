// paths
var paths = require('./paths');

// modules
var gulp = require('gulp'),
	beep = require('./beep'),
	plumber = require('gulp-plumber'),
	connect = require('gulp-connect'),
    changed = require('gulp-changed'),
	
	postcss = require('gulp-postcss'),
	postxml = require('gulp-postxml'),
	plugins = [
		require('postxml-import')({
			path: function (attr) {
                if (!/(\\|\/|\.)/.test(attr)) {
                    return 'modules/' + attr + '/' + attr + '.htm';
                }
				return attr;
			}
		}),
		require('postxml-beml')(),
		require('postxml-imgalt')(),
		require('postxml-placeholder')({
			url: 'http://placehold.alanev.ru/'
		}),
		require('postxml-image-size')({
			cwd: paths.dest
		}),
		require('postxml-wrap')(),
		require('postxml-repeat')()
	]
	;

// task
var task = function () {
	return gulp.src(`${paths.src}*.htm`)
        .pipe(changed(paths.dest))
		.pipe(plumber(beep))
		.pipe(postxml(plugins))
		.pipe(plumber.stop())
		.pipe(gulp.dest(paths.dest))
		.pipe(connect.reload())
		;
}

// module
module.exports = task;