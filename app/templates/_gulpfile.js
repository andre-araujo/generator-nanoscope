'use strict';

/* required modules
* gulp
* browser-sync (Browser reloader)
* harp (Static server)
* gulp-babel (ES6)
* gulp-plumber (Prevent pipe breaking caused by errors from gulp plugins)
* gulp-concat (concat files)
*/

var gulp        = require('gulp');
var harp        = require('harp');

//GULP TASKS
var taskModules = require('./gulp-tasks/modules');
var taskServe   = require('./gulp-tasks/serve');
var taskScripts = require('./gulp-tasks/scripts')

gulp.task('serve', taskServe);

gulp.task('compile', function () {
    harp.compile(__dirname + "/src", __dirname + "/www", function(errors, output){
        if(errors) {
            console.log(JSON.stringify(errors, null, 2))
            process.exit(1)
        }
    })
});

gulp.task('scripts', taskScripts);

gulp.task('modules', taskModules);

gulp.task('default', ['serve']);
