// modules
var config = require('../config'),
	gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	postcss = require('gulp-postcss'),
	scss = require('postcss-scss'),
	plugins = [
		require('postcss-mixins')(),
		require('postcss-nested-props')(),
		require('postcss-nested')(),
		require('postcss-custom-media')(),
		require('postcss-simple-vars')(),
		require('postcss-custom-selectors')(),
		require('postcss-short-size'),
		require('postcss-short-position'),
		require('postcss-selector-not')(),
		require('postcss-focus')(),
		require('postcss-color-function')(),
		require('webpcss').default({
			webpClass: [config.docClass, 'webp'].join(''),
			noWebpClass: [config.docClass, 'no-webp'].join(''),
		}),
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
		// require('csswring')()
	]
	;

// paths
var paths = require('./paths');

// task
var task = function () {
	return gulp.src(paths.css.src)
		.pipe(plumber())
		.pipe(concat(paths.css.name))
		.pipe(postcss(plugins, {
			syntas: scss
		}))
		.pipe(plumber.stop())
		.pipe(gulp.dest(paths.dest))
		.pipe(connect.reload())
		;
}

// module
module.exports = task;