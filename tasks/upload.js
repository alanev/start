var gulp = require('gulp'),
	ftp = require('gulp-ftp'),
	zip = require('gulp-zip')
	;

// settings
var paths = require('./paths'),
	ftppass = require('../config').ftp,
	pkg = require('../package.json')
	;
ftppass.remotePath = "/" + pkg.name;

// task
var tasks = {};
tasks.fpt = function () {
	gulp.src([
			paths.dest + '**',
			'!' + paths.dest + '**.{png,jpg,gif,svg,webp}'
		])
		.pipe(ftp(ftppass))
		;
};
tasks.all = function () {
	gulp.src([
			paths.dest + '**'
		])
		.pipe(ftp(ftppass))
		;
};
tasks.archive = function () {
	gulp.src([
			paths.dest + '**'
		])
		.pipe(zip(pkg.name + '.zip'))
		.pipe(ftp(ftppass))
		;
	gulp.src([
			paths.src + '**',
			paths.dest + '**',
			'*',
			'!node_modules',
			'!src',
			'!ftp.json'
		],{
			base: __dirname
		})
		.pipe(zip(pkg.name + '.dev.zip'))
		.pipe(ftp(ftppass))
		;
}