
globals = require "./../globals"

# home controller module
exports.getList = (req, res)->

  # getting model name
  modelName = req.params.model.charAt(0).toUpperCase() + req.params.model.slice(1)

  # retrieving model config object
  modelConfigObject = globals.helpers.getModelConfigObject(modelName)

  # constructing request object
  request = {}

  # handling attributes
  request.attributes = modelConfigObject.attributes if modelConfigObject.attributes

  # retrieving all models
  globals.modelsObject[modelName].findAll(request).success (modelsList)->

    globals.helpers.getAllModelNames (err, modelsNames)->

      # render template
      data = globals.jade.renderFile "#{globals.viewsDir}/list.jade",
        prefix               : globals.prefix
        modelsNames       : modelsNames
        list              : JSON.parse(JSON.stringify(modelsList))
        model             : globals.modelsObject[modelName]
        modelConfigObject : modelConfigObject

      # set content-type
      res.set "Content-Type", "text/html"

      # send data
      res.end data