
globals = require "./globals"

module.exports = (prefix, appObject, configObject, modelsObject)->

  # set recieved externals to globals
  # for transparent access from other modules
  globals.prefix        = prefix
  globals.appObject     = appObject
  globals.configObject  = configObject
  globals.modelsObject  = modelsObject

  # add sequelize-compass Express routes
  require("./router")(prefix, appObject, configObject, modelsObject)


