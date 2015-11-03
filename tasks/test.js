var gulp = require('gulp'),
	psi = require('psi'),
	htmlhint = require('gulp-htmlhint'),
	csslint = require('gulp-csslint'),
	eslint = require('gulp-eslint'),
	fs = require('fs');

// settings
var paths = require('./paths'),
	pkg = require('../package.json'),
	config = {
		psi: {
			locale: 'ru_RU',
			strategy: 'desktop'
		}
	};

// task
var tasks = {
	speed: function () {
		psi(['projects.alanev.ru/apc'].join(''), config.psi, function (err, data) {
			if (err) {
				console.log(err);
			} else {
				fs.writeFile('tests/psi.json', JSON.stringify(data, '', '\t'));
			}
		});
		psi.output(['projects.alanev.ru/apc'].join(''), config.psi, function (err) {
			if (err) console.log(err);
		});
	},
	html: function () {
		return gulp.src(paths.dest + '*.{htm,html}')
				.pipe(htmlhint())
				.pipe(htmlhint.reporter())
				;
	},
	css: function () {
		return gulp.src(paths.dest + '*.css')
				.pipe(csslint())
				.pipe(csslint.reporter());
	},
	js: function () {
		return gulp.src(paths.dest + '*.js')
				.pipe(eslint())
				.pipe(eslint.format());
	}
};

module.exports = tasks;