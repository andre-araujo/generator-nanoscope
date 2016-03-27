'use strict';

var generators = require("yeoman-generator"),
    _ = require("lodash");

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);

        this.argument('name', { type: String, required: true });
        console.log("test", this.name)
    },
    writing: function() {

    }
});
