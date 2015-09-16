(function() {
  var globals;

  globals = require("./globals");

  module.exports = function(prefix, appObject, configObject, modelsObject) {
    globals.prefix = prefix;
    globals.appObject = appObject;
    globals.configObject = configObject;
    globals.modelsObject = modelsObject;
    return require("./router")(prefix, appObject, configObject, modelsObject);
  };

}).call(this);
