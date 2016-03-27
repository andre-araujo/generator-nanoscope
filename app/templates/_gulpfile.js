var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var harp        = require('harp');

gulp.task('serve', function () {
  harp.server(__dirname + "/src", {
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
});

gulp.task('compile', function () {
    harp.compile(__dirname + "/src", __dirname + "/www", function(errors, output){
      if(errors) {
        console.log(JSON.stringify(errors, null, 2))
        process.exit(1)
      }
    })
});


gulp.task('default', ['serve']);
