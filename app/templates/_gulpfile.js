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

gulp.task('modules', function() {
    var subDirs = [];
    var jadeIncludes = [];
    var sassIncludes = [];

    var moduleDirs = fs.readdirSync(__dirname + "/src/_modules").filter(function(dir) {
        if(dir != "_index.jade" && dir != "_main.sass") {
            return true;
        }
        return false;
    });

    subDirs = moduleDirs.map(function(subdir) {
        return {
            dirName: fs.readdirSync(__dirname + "/src/_modules/" + subdir),
            dirType: subdir
        }
    });

    for (var subDir of subDirs) {
        jadeIncludes.push(subDir.dirName.map(function(dir) {
            return "include " + subDir.dirType + "/" + dir + "/_index\n";
        }));
        sassIncludes.push(subDir.dirName.map(function(dir) {
            return "@import '" + subDir.dirType + "/" + dir + "/_main.sass'\n";
        }));
    }

    fs.writeFileSync(__dirname + "/src/_modules/_index.jade", jadeIncludes.join().replace(/[,]+/g, ""))
    fs.writeFileSync(__dirname + "/src/_modules/_main.sass", sassIncludes.join().replace(/[,]+/g, ""))
    console.log("Refreshing modules index...")
})

gulp.task('default', ['serve']);
