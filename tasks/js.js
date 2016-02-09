// modules
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	
	// utils
	path = require('path'),
	plumber = require('gulp-plumber'),
	beep = require('./beep'),
	concat = require('gulp-concat'),
    connect = require('gulp-connect'),
	
	// js
	webpack = require('webpack'),
	uglify = require('gulp-uglify')
	;

// paths
var paths = require('./paths');

// task
var tasks = function () {
	webpack({
        entry: {
            defer: path.join(process.cwd(), paths.js.src, paths.js.name.defer + '.' + paths.js.name.enter),
            async: path.join(process.cwd(), paths.js.src, paths.js.name.async + '.' + paths.js.name.enter)
        },
        output: {
            path: path.join(process.cwd(), paths.dest),
            filename: '[name].' + paths.js.name.bundle
        },
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin()
        ]
	}, function (err, stats) {
        gulp.src([
                path.join(paths.dest, paths.js.name.defer + '.' + paths.js.name.bundle),
                path.join(paths.dest, paths.js.name.async + '.' + paths.js.name.bundle)
            ])
            .pipe(connect.reload())
    });
};

// module
module.exports = tasks;