// paths
var paths = require('./paths');

// modules
var config = require('../config'),
	beep = require('./beep'),
	gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	connect = require('gulp-connect'),
	path = require('path'),
	glob = require('glob')

	postcss = require('gulp-postcss'),
	parser = require('postcss-scss'),
	plugins = [
		
		require('postcss-import')({
			resolve: function(id, basedir, importOptions) {
				if (!/(\\|\/|\.)/.test(id))
					return glob.sync(paths.modules + id + '/*.scss');
				return id;
			}
		}),

		require('postcss-property-shorthand')({
			syntax: 'scss'
		}),
		
		require('postcss-if-media')(),
		require('postcss-mixins')(),
		require('postcss-nested')(),
		require('postcss-extend')(),
		require('postcss-simple-vars')(),
		require('postcss-each')(),
		
		// Future css
		// require('postcss-autoreset')(),
		require('postcss-cssnext')(),
		
		// Helpers (shortcuts)
		require('postcss-focus')(),
		require('postcss-short'),
		require('lost')({
			gutter: '0',
			flexbox: 'flex'
		}),
		require('webpcss').default({
			webpClass: ['.', config.modernizr.classPrefix, 'webp'].join(''),
			noWebpClass: ['.', config.modernizr.classPrefix, 'no-webp'].join(''),
		}),

		// Libs
		require('postcss-animation')(),
		require('postcss-brand-colors')(),
		
		// Optimisations
		require('css-mqpacker')(),
		require('cssnano')({
			core: false,
			autoprefixer: false
		})
	];

// task
var task = function() {
	gulp.src(`${paths.src}*.css`)
		.pipe(plumber(beep))
		.pipe(postcss(plugins, {parser}))
		.pipe(plumber.stop())
		.pipe(gulp.dest(paths.dest))
		.pipe(connect.reload());
}

// module
module.exports = task;