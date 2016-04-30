var fs = require("fs");
var browserify = require("browserify");

module.exports = function () {
	browserify("src/assets/scripts/_js/main.js")
	  .transform("babelify", {presets: ["es2015", "react"]})
	  .bundle()
	  .pipe(fs.createWriteStream("src/assets/scripts/app.js"));
}
