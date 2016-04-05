// paths
var paths = require('./paths');

// modules
var config = require('../config'),
	beep = require('./beep'),
	gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	connect = require('gulp-connect'),
	path = require('path'),
	glob = require('glob'),

	postcss = require('gulp-postcss'),
	syntax = require('postcss-scss'),
	plugins = [
		require('postcss-import')({
			resolve: function(id, basedir, importOptions) {
				if (!/(\\|\/|\.)/.test(id)) {
					return glob.sync(paths.modules + id + '/*.scss');
				}
				return id;
			}
		}),
		require('postcss-mixins')(),
		require('postcss-nested')(),
		require('postcss-custom-media')(),
		require('postcss-simple-vars')(),
		require('postcss-conditionals')(),
		require('postcss-custom-selectors')(),
		require('postcss-short-size'),
		require('postcss-short-position'),
		require('postcss-selector-not')(),
		require('postcss-focus')(),
		require('postcss-color-function')(),
		require('lost')({
			gutter: '0',
			flexbox: 'flex'
		}),
		require('webpcss').default({
			webpClass: ['.', config.modernizr.classPrefix, 'webp'].join(''),
			noWebpClass: ['.', config.modernizr.classPrefix, 'no-webp'].join(''),
		}),
		require('postcss-extend')(),
		require('postcss-write-svg')(),
		require('autoprefixer')(),

		// optimisations
		require('postcss-discard-comments')(),
		require('postcss-discard-empty')(),
		require('postcss-calc')(),
		require('postcss-normalize-url')(),
		require('postcss-minify-selectors')(),
		require('postcss-merge-longhand')(),
		// require('postcss-font-family')(),
		require('postcss-convert-values')({
			length: false,
			angle: false
		}),
		require('postcss-colormin')(),
		require('postcss-merge-rules')(),
		// require('postcss-discard-unused')(),
		require('postcss-zindex')(),
		require('postcss-reduce-idents')(),
		require('css-mqpacker')(),
		require('csswring')()
	];

// task
var task = function() {
	gulp.src(`${paths.src}*.css`)
		.pipe(plumber(beep))
		.pipe(postcss(plugins, {
			syntax: syntax
		}))
		.pipe(plumber.stop())
		.pipe(gulp.dest(paths.dest))
		.pipe(connect.reload());
}

// module
module.exports = task;