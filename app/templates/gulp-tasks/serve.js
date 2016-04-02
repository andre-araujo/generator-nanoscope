var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var harp        = require('harp');
var gulp        = require('gulp');

var base = __dirname + "/..";

module.exports = function() {
    harp.server( base + "/src", {
        port: 9000
    }, function () {
        browserSync({
            proxy: "localhost:9000",
            open: true,
            notify: {
                styles: ['opacity: 0', 'position: absolute']
            }
        });

        gulp.watch(["src/styles/**/*.sass", "src/_modules/**/*.sass"], function () {
            reload("/assets/styles/main.css", {stream: true});
        });

        gulp.watch(["src/**/*.jade", "src/**/*.json"], function () {
            reload();
        });
    })
};
