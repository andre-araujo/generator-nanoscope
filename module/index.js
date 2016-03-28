'use strict';

var generators = require("yeoman-generator"),
    _ = require("lodash");

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);

        this.argument('name', { type: String, required: true });
        console.log("test", this.name)
    },
    prompting: function() {
        var done = this.async();
        this.prompt(
            {
                type: "list",
                name: "moduleType",
                message: "Select the module type that will be created.",
                choices: [
                    {
                        name: "Atom",
                        value: "atom"
                    },
                    {
                        name: "Molecule",
                        value: "molecule"
                    },
                    {
                        name: "Organism",
                        value: "organism"
                    }
                ],
            },
            function(resp) {
                this.moduleType = resp.moduleType;
                console.log(this.moduleType)

                done();

            }.bind(this)
        );
    },
    writing: function() {
        // var modulePrefix = function(type) {
        //     var prefix;
        //     //
        //     // if(type === "")
        // };

        this.fs.copyTpl(
            this.templatePath("_index.jade"),
            this.destinationPath("src/_modules/_" + this.moduleType + "s/" + this.name + "/_index.jade"),
            {
                moduleName: this.name,
                modulePrefix: this.name,
                moduleType: this.moduleType
            }
        )
        var exec = require('child_process').exec;
        var cmd = 'gulp modules';

        exec(cmd, function(error, stdout, stderr) {
          // command output is in stdout
        });
    },
    end: function() {

    }
});
