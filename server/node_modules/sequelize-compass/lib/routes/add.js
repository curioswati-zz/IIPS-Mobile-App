(function() {
  var globals;

  globals = require("./../globals");

  exports.getAdd = function(req, res) {
    var modelConfigObject, modelName;
    modelName = globals.helpers.capitalizeFirstLetter(req.params.model);
    modelConfigObject = globals.helpers.getModelConfigObject(modelName);
    return globals.helpers.getAllModelNames(function(err, modelsNames) {
      var associationInstances, getAllModelInstances;
      associationInstances = {};
      getAllModelInstances = {
        get: function(_, callback) {
          return globals.modelsObject[_.model].findAll().success(function(instances) {
            associationInstances[_.as] = instances;
            return callback(null, "OK");
          });
        }
      };
      return globals.async.map(modelConfigObject.associations, getAllModelInstances.get.bind(getAllModelInstances), function(err, result) {
        var data;
        data = globals.jade.renderFile("" + globals.viewsDir + "/single.jade", {
          prefix: globals.prefix,
          action: "add",
          modelsNames: modelsNames,
          model: globals.modelsObject[modelName],
          modelConfigObject: modelConfigObject,
          associationInstances: associationInstances
        });
        res.set("Content-Type", "text/html");
        return res.end(data);
      });
    });
  };

  exports.postAdd = function(req, res) {
    var modelConfigObject, modelName, newModel, requestedInstanceID;
    requestedInstanceID = req.params.id;
    modelName = req.params.model.charAt(0).toUpperCase() + req.params.model.slice(1);
    modelConfigObject = globals.helpers.getModelConfigObject(modelName);
    newModel = {};
    modelConfigObject.attributes.forEach(function(attribute) {
      if (newModel[attribute] !== "id") {
        return newModel[attribute] = req.body[attribute];
      }
    });
    return globals.modelsObject[modelName].create(newModel).success(function(modelInstance) {
      var setAssociation;
      setAssociation = {
        set: function(associationData, callback) {
          var retrieveAssociationObjects;
          retrieveAssociationObjects = {
            retrieve: function(objectID, callback) {
              return globals.modelsObject[associationData.model].find({
                where: {
                  id: objectID
                }
              }).success(function(object) {
                return callback(null, object);
              }).error(function(err) {
                return callback(err, null);
              });
            }
          };
          switch (associationData.type) {
            case "hasMany":
              return require("async").map(globals.helpers.processMultipleSelectToArray(req.body["" + associationData.as]), retrieveAssociationObjects.retrieve.bind(retrieveAssociationObjects), function(err, retrievedObjects) {
                return modelInstance["set" + associationData.as](retrievedObjects).success(function() {
                  return callback(null, "OK");
                });
              });
            case "belongsTo":
              return globals.modelsObject[associationData.model].find({
                where: {
                  id: req.body["" + associationData.as]
                },
                limit: 1
              }).success(function(associationModel) {
                return modelInstance["set" + associationData.as](associationModel).success(function() {
                  return callback(null, "OK");
                });
              }).error(function(err) {
                return callback(err, null);
              });
          }
        }
      };
      return require("async").map(modelConfigObject.associations, setAssociation.set.bind(setAssociation), function(err, result) {
        return res.redirect("" + globals.prefix + "/" + modelName);
      });
    });
  };

}).call(this);
