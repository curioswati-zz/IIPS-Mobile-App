(function() {
  var globals;

  globals = require("./../globals");

  exports.getList = function(req, res) {
    var modelConfigObject, modelName, request;
    modelName = req.params.model.charAt(0).toUpperCase() + req.params.model.slice(1);
    modelConfigObject = globals.helpers.getModelConfigObject(modelName);
    request = {};
    if (modelConfigObject.attributes) {
      request.attributes = modelConfigObject.attributes;
    }
    return globals.modelsObject[modelName].findAll(request).success(function(modelsList) {
      return globals.helpers.getAllModelNames(function(err, modelsNames) {
        var data;
        data = globals.jade.renderFile("" + globals.viewsDir + "/list.jade", {
          prefix: globals.prefix,
          modelsNames: modelsNames,
          list: JSON.parse(JSON.stringify(modelsList)),
          model: globals.modelsObject[modelName],
          modelConfigObject: modelConfigObject
        });
        res.set("Content-Type", "text/html");
        return res.end(data);
      });
    });
  };

}).call(this);
