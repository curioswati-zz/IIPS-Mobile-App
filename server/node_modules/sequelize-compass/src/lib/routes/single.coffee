

globals = require "./../globals"

# home controller module
exports.getSingle = (req, res)->

  # requested model ID
  requestedInstanceID = req.params.id

  # getting model name
  modelName = globals.helpers.capitalizeFirstLetter req.params.model

  # retrieving model config object
  modelConfigObject = globals.helpers.getModelConfigObject(modelName)

  # constructing request object
  request = {}

  # adding `where`
  request.where = {}

  # adding id
  request.where["id"] = requestedInstanceID if requestedInstanceID

  # include eager loading
  request.include = []

  # construct inlcude array for eager loading by modelConfigObject.associations
  modelConfigObject.associations.forEach (association)->

    # push [
    #   model : ...
    #   as    : ...
    # ]
    # to include array
    request.include.push
      model : globals.modelsObject[association.model]
      as    : association.as

  # retrieving main single model by requested ID
  # with constructed request object
  globals.modelsObject[modelName].find(request).success (modelInstance)->

    globals.helpers.getAllModelNames (err, modelsNames)->

      # create associationInstances object
      associationInstances = {}

      # async function to get ALL instances for association fields
      getAllModelInstances = get : (_, callback) ->

        # find all instances for requested model
        globals.modelsObject[_.model].findAll().success (instances)->

          # set associationInstances as { modelname : [ instances ] }
          associationInstances[_.as] = instances
          callback null, "OK"

      # get all model Instances for every association type to show in association fields
      require("async").map modelConfigObject.associations, getAllModelInstances.get.bind(getAllModelInstances), (err, result) ->

        # render template
        data = globals.jade.renderFile "#{globals.viewsDir}/single.jade",
          prefix               : globals.prefix
          action               : "edit"
          modelsNames          : modelsNames
          modelInstance        : JSON.parse(JSON.stringify(modelInstance))
          model                : globals.modelsObject[modelName]
          modelConfigObject    : modelConfigObject
          associationInstances : associationInstances

        # set content-type
        res.set "Content-Type", "text/html"

        # send data
        res.end data


exports.postSingle = (req, res)->

  # requested model ID
  requestedInstanceID = req.params.id

  # getting model name
  modelName = req.params.model.charAt(0).toUpperCase() + req.params.model.slice(1)

  # retrieving model config object
  modelConfigObject = globals.helpers.getModelConfigObject(modelName)

  # retrieving all models
  globals.modelsObject[modelName].find(
    where :
      id  : requestedInstanceID
  )
  .success (modelInstance)->

    # set new values, got from frontend
    modelConfigObject.attributes.forEach (attribute)->
      modelInstance[attribute] = req.body[attribute]

    # save new values
    modelInstance.save()
    .success ->

      # async function to get ALL instances for association fields
      setAssociation = set : (associationData, callback) ->

        # function for retrieving objects for association
        retrieveAssociationObjects = retrieve: (objectID, callback) ->

          globals.modelsObject[associationData.model].find(
            where :
              id : objectID
          )
          .success (object)->
            callback null, object
          .error (err)->
            callback err, null


        # determine association type
        switch associationData.type

        # when hasMany
          when "hasMany"

          # retrieve objects
            require("async").map globals.helpers.processMultipleSelectToArray(req.body["#{associationData.as}"]), retrieveAssociationObjects.retrieve.bind(retrieveAssociationObjects), (err, retrievedObjects)->

              # set associations
              modelInstance["set#{associationData.as}"](retrievedObjects)
              .success ->

                # associations set succesfully
                callback null, "OK"



        # when belongsTo
          when "belongsTo"

          # just find one model for association
            globals.modelsObject[associationData.model].find(
              where :
                id  : req.body["#{associationData.as}"]
              limit : 1
            )
            .success (associationModel)->

              # if such model was found
              modelInstance["set#{associationData.as}"](associationModel)
              .success ->

                # association for single model set succesfully
                callback null, "OK"

            .error (err)->

              # oops
              callback err, null


      # async map all assocications
      require("async").map modelConfigObject.associations, setAssociation.set.bind(setAssociation), (err, result) ->
        res.redirect "#{globals.prefix}/#{modelName}"
