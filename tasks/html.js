// paths
var paths = require('./paths');

// modules
var gulp = require('gulp'),
	beep = require('./beep'),
	plumber = require('gulp-plumber'),
	connect = require('gulp-connect'),

	postcss = require('gulp-postcss'),
	postxml = require('gulp-postxml'),
	plugins = [
		require('postxml-import')({
			path (attr) {
				if (!/(\\|\/|\.|--)/.test(attr))
					return `modules/${attr}/${attr}.htm`;
				if (/--/.test(attr))
					return `modules/${attr.replace(/--.+$/, '')}/${attr}.htm`;
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
		require('postxml-repeat')(),
		(opts => ($) => {
			const w3c = require('w3cjs');
			w3c.validate({
				input: $.html(),
				output: 'json',
				callback ({messages}) {
					console.log(messages);
				}
			});
		})()
	]
	;

// task
var task = function () {
	return gulp.src(`${paths.src}*.htm`)
		.pipe(plumber(beep))
		.pipe(postxml(plugins))
		.pipe(plumber.stop())
		.pipe(gulp.dest(paths.dest))
		.pipe(connect.reload())
		;
}

// module
module.exports = task;
