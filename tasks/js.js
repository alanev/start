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
    glob = require('glob')
	;

// paths
var paths = require('./paths');;

// task
var tasks = function () {
    var files = {};
    glob.sync(
            path.join(
                process.cwd(), `${paths.src}*.js`
            )
        ).forEach(function (p) {
            files[path.parse(p).base] = p;
        });
    
	webpack({
        entry: files,
        output: {
            filename: '[name]',
            path: path.join(process.cwd(), paths.dest)
        },
        resolve: {
            root: [
                path.resolve('./modules')
            ]
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
        gulp.src(path.join(paths.dest, `${paths.src}.js`))
            .pipe(connect.reload())
    });
};

// module
module.exports = tasks;