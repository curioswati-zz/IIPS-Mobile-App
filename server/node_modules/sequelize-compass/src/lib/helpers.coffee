globals = require "./globals"

# ======================================
# function returns all models names array
# from common Compass config
# ======================================
# example return
# ======================================
# ["Author", "Book", "Customer", ...]
# ======================================
exports.getAllModelNames = (callback)->

  # create empty return object
  # for model names Array
  modelNamesArray = []

  # sync iterate over every model config
  globals.configObject.models.forEach (model)->

    # push every model name to array
    modelNamesArray.push model.modelName

  # async return model names Array
  callback null, modelNamesArray


# ======================================
# function retrieves model config object
# from common Compass config
# ======================================
# example return
# ======================================
# modelName    : "Book"
#   attributes : ["id", "publicationDate", "title", "text"]
#   pKey       : ["id"]
#   ...
# ======================================
exports.getModelConfigObject = (name)->

  # create empty return object
  _model = undefined

  # sync iterate over every model config
  globals.configObject.models.forEach (model)->

    # if model name is found
    if model.modelName is name

      # set it to outer object
      _model = model

  # return found object
  _model


exports.capitalizeFirstLetter = (word)->
  word.charAt(0).toUpperCase() + word.slice(1)


exports.processMultipleSelectToArray = (data)->

  # create return array
  _result = []

  # if we got empty set (no options were selected)
  unless data
    console.log "no options were selected"
    _result = []

  else

    # if one option was selected
    if typeof data is "string"
      _result.push data

    # if it's array (multiple options were selected)
    if typeof data is "object"
      _result = data

  # return result
  _result