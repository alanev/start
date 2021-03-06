var gulp = require('gulp'),
	sync = require('run-sequence'),
	tasks = require('require-dir')('./tasks');

// Html
gulp.task('html', tasks.html);

// Css
gulp.task('css', tasks.css);

// Js
gulp.task('js', tasks.js);

// Assets
gulp.task('img', function () {
	sync('img:clean', 'img:min');
});
gulp.task('img:min', tasks.img.min);
gulp.task('img:clean', tasks.img.clean);

gulp.task('sprite', function () {
	sync('sprite:make', 'img:clean', 'img:min');
});
gulp.task('sprite:make', tasks.sprite);

gulp.task('fonts', tasks.fonts);

// Dev
gulp.task('modules', tasks.modules);
gulp.task('server', tasks.server);
gulp.task('dev', ['img', 'html', 'css', 'js', 'watch']);
gulp.task('watch', ['server'], tasks.watch);

// Test
gulp.task('test', ['test:html', 'test:css', 'test:js', 'test:speed']);
gulp.task('test:speed', tasks.test.speed);
gulp.task('test:html', tasks.test.html);
gulp.task('test:css', tasks.test.css);
gulp.task('test:js', tasks.test.js);

// Modernizr
