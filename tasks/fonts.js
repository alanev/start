var gulp = require('gulp');
var paths = require('./paths');

module.exports = function () {
    gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
}
