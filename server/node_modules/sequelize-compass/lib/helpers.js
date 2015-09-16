(function() {
  var globals;

  globals = require("./globals");

  exports.getAllModelNames = function(callback) {
    var modelNamesArray;
    modelNamesArray = [];
    globals.configObject.models.forEach(function(model) {
      return modelNamesArray.push(model.modelName);
    });
    return callback(null, modelNamesArray);
  };

  exports.getModelConfigObject = function(name) {
    var _model;
    _model = void 0;
    globals.configObject.models.forEach(function(model) {
      if (model.modelName === name) {
        return _model = model;
      }
    });
    return _model;
  };

  exports.capitalizeFirstLetter = function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  exports.processMultipleSelectToArray = function(data) {
    var _result;
    _result = [];
    if (!data) {
      console.log("no options were selected");
      _result = [];
    } else {
      if (typeof data === "string") {
        _result.push(data);
      }
      if (typeof data === "object") {
        _result = data;
      }
    }
    return _result;
  };

}).call(this);
