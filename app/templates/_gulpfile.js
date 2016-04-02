'use strict';

/* required modules
gulp
browser-sync
harp
*/

var gulp        = require('gulp');

//GULP TASKS
var taskModules = require('./gulp-tasks/modules');
var taskServe   = require('./gulp-tasks/serve');

gulp.task('serve', taskServe);

gulp.task('compile', function () {
    harp.compile(__dirname + "/src", __dirname + "/www", function(errors, output){
        if(errors) {
            console.log(JSON.stringify(errors, null, 2))
            process.exit(1)
        }
    })
});

gulp.task('modules', taskModules);

gulp.task('default', ['serve']);
