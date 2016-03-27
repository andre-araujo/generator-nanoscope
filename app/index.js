'use strict';

var generators = require("yeoman-generator");

module.exports = generators.Base.extend({
    constructor: function() {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        console.log('hello');
    },
    initializing: function() {
    },
    prompting: function() {
    },
    configuring: function() {
    },
    default: function() {
    },
    writing: {

        packageJson: function() {
            this.copy("_package.json", "package.json")
        },
        git: function() {
            this.copy("gitignore", ".gitignore")
        },
        bower: function() {
            var bowerJson = {
                name: 'Nanoscope',
                license: 'MIT',
                dependencies: {}

            };
            bowerJson.dependencies['jquery'] = '~1.12.0';
            this.fs.writeJSON('bower.json', bowerJson);

            this.copy("bowerrc", ".bowerrc")
        },
        gulp: function() {
            this.copy("_gulpfile.js", "gulpfile.js")
            this.copy("_gulp.config.js", "gulp.config.js")
        },
        statics: function() {
            //this.copy("_test.txt", "src/test.txt");
            // inside assets
            this.directory("assets/fonts", "src/assets/fonts");
            this.directory("assets/img", "src/assets/img");
            this.directory("assets/scripts", "src/assets/scripts");
            this.directory("assets/styles", "src/assets/styles");
            this.directory("assets/vendor", "src/assets/vendor");

            //modules
            this.directory("_modules", "src/_modules");
        },
        scripts: function() {

        },
        jade: function() {
            this.copy("_index.jade", "src/index.jade")

            this.fs.copyTpl(
                this.templatePath("_layout.jade"),
                this.destinationPath("src/_layout.jade"),
                {
                    appname: "Nanoscope"
                }
            );
        }
    },
    conflicts: function() {
    },
    install: function() {
    },
    end: function() {
    }
});
