var gulp = require('gulp'),
	del = require('del'),
	flatten = require('gulp-flatten'),
	Imagemin = require('imagemin'),
	webp = require('imagemin-webp')
	;

// paths
var paths = require('./paths');
var logger = (err, files) => {
    if (err) {
        console.log('Error', err);
    } else if (files.length === 0) {
        console.log('No files');
    } else {
        // Define action
        var action = 'Minified';
        if (/\.webp$/.test(files[0].history[files[0].history.length - 1])) action = 'Convert to webp';

        // Log
        console.log(`${action}: ${files.length} images.`);
    }
}

// task
var tasks = {
	min: function () {
        new Imagemin()
            .src(paths.img.src)
            .dest(paths.img.dest)
            .use(flatten())
            .use(Imagemin.jpegtran({
				progressive: true
            }))
            .use(Imagemin.optipng({
				optimizationLevel: 5
            }))
            .run(logger);
        
        new Imagemin()
            .src(paths.img.src)
            .dest(paths.img.dest)
            .use(flatten())
            .use(webp({
                quality: 50
            }))
            .run(logger);
	},
	clean: function () {
		del([
			paths.img.dest + '**',
			paths.img.dest
		]);
	}
};

// module
module.exports = tasks;