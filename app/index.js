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
                default: this.config.get("appname") || "myApp",
                //store: true
            },
            {
                type: "list",
                name: "jslibs",
                message: "Witch framework you want to use?",
                choices: [
                    {
                        name: "Jquery",
                        value: "jquery"
                    },
                    {
                        name: "Umbrellajs",
                        value: "umbrellajs"
                    },
                    {
                        name: "None",
                        value: "none"
                    }
                ],
            }

        ], function(resp) {
            console.log(resp);

            this.config.set("appname", resp.appname);

            this.config.set("libs", {
                jquery: _.includes(resp.jslibs, "jquery"),
                umbrellajs: _.includes(resp.jslibs, "umbrellajs")
            })

            this.config.save();

            done();

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
                name: this.config.get("appname"),
                license: 'MIT',
                dependencies: {}
            };

            if(this.config.get("libs").jquery) {
                bowerJson.dependencies['jquery'] = '~1.12.0';
            }

            if(this.config.get("libs").umbrella) {
                bowerJson.dependencies['umbrella'] = '^2.0.1';
            }
            bowerJson.dependencies['umbrella'] = '^2.0.1';

            this.fs.writeJSON('bower.json', bowerJson);

            this.copy("bowerrc", ".bowerrc")
        },
        gulp: function() {
            this.copy("_gulpfile.js", "gulpfile.js")
            this.directory("gulp-tasks", "gulp-tasks")
        },
        statics: function() {
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
                    appname: _.startCase(this.config.get("appname"))
                }
            );
        }
    },
    conflicts: function() {
    },
    install: function() {
        this.installDependencies({
            skipInstall: this.options["skip-install"]
        });
    },
    end: function() {
        this.log(chalk.green.bold("Project generated!"));
    }
});
