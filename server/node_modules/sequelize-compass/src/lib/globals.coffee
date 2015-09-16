
# dependencies
async                  = exports.async                  = require("async")
jade                   = exports.jade                   = require("jade")
path                   = exports.path                   = require("path")
fs                     = exports.fs                     = require("fs")

# constants
exports.viewsDir = path.join(__dirname, "./../views")

# in-app modules
exports.helpers = require "./helpers"