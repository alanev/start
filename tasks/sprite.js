var gulp = require('gulp'),
	spritesmith = require('gulp.spritesmith'),
	merge = require('merge-stream')
	;

// paths
var paths = require('./paths');

// task
var task = function () {
		var spriteData = gulp.src(paths.sprite.src)
			.pipe(spritesmith({
				imgName: paths.sprite.img.name,
				cssName: paths.sprite.css.name,
				cssTemplate: paths.sprite.tmpl,
				padding: 5
			}));
		var spriteImg = spriteData.img
			.pipe(gulp.dest(paths.sprite.img.dest));
		var spriteCss = spriteData.css
			.pipe(gulp.dest(paths.sprite.css.dest));
		
		return merge(spriteImg, spriteCss);
	}

// module
module.exports = task;