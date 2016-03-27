'use strict';

var generators = require("yeoman-generator"),
    _ = require("lodash"),
    chalk = require("chalk"),
    yosay = require("yosay");

module.exports = generators.Base.extend({
    constructor: function() {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        // this.argument("appname", {type: String, required: true});
        // this.appname = _.kebabCase(this.appname)

        // this.option("includeJquery", {
        //     desc: 'includes Jquery',
        //     type: Boolean,
        //     default: false
        // })
    },
    initializing: function() {
    },
    prompting: function() {
        this.log(yosay("welcome to " + chalk.blue("nanoscope")));

        var done = this.async();
        this.prompt([
            {
                type: "input",
                name: "appname",
                message: "Application name",
                default: "myApp"
            },
            {
                type: "checkbox",
                name: "jslibs",
                message: "Select JavaScript libraries that you wanna use.",
                choices: [
                    {
                        name: "Jquery",
                        value: "jquery",
                        checked: "true"
                    },
                    {
                        name: "Umbrellajs",
                        value: "umbrellajs",
                        checked: "true"
                    }
                ]
            }

        ], function(resp) {
            console.log(resp);
            this.appname = resp.appname
            done();

            this.includeJquery = _.includes(resp.jslibs, "jquery");
            this.includeUmbrellajs = _.includes(resp.jslibs, "umbrellajs");

        }.bind(this));
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
                name: this.appname,
                license: 'MIT',
                dependencies: {}
            };

            if(this.includeJquery) {
                bowerJson.dependencies['jquery'] = '~1.12.0';
            }

            if(this.includeUmbrellajs) {
                bowerJson.dependencies['umbrella'] = '^2.0.1';
            }
            bowerJson.dependencies['umbrella'] = '^2.0.1';

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
                    appname: _.startCase(this.appname)
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
