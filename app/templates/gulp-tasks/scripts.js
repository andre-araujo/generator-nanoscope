var gulp        = require('gulp');
var babel       = require('gulp-babel');
var plumber     = require('gulp-plumber');
var concat      = require('gulp-concat');

var base = __dirname + "/..";

module.exports = function () {
    gulp.src('src/assets/scripts/_js/**/*.js')
        .pipe(plumber())
        .pipe(concat("app.js"))
        .pipe(babel({
            presets: ['es2015']
        }))
        //.pipe(uglify())
        .pipe(gulp.dest('src/assets/scripts/'));
};
