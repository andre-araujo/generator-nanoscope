var fs          = require('fs');

var base = __dirname + "/..";
var subDirs = [];
var moduleDirs;
var jadeIncludes = [];
var sassIncludes = [];

module.exports = function() {

    moduleDirs = fs.readdirSync( base + "/src/_modules").filter(function(dir) {
        if(dir != "_index.jade" && dir != "_main.sass") {
            return true;
        }
        return false;
    });

    subDirs = moduleDirs.map(function(subdir) {
        return {
            dirName: fs.readdirSync( base + "/src/_modules/" + subdir),
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

    fs.writeFileSync( base + "/src/_modules/_index.jade", jadeIncludes.join().replace(/[,]+/g, ""))
    fs.writeFileSync( base + "/src/_modules/_main.sass", sassIncludes.join().replace(/[,]+/g, ""))
    console.log("Refreshing modules index...")
};
