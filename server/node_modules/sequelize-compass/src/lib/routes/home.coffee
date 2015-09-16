
globals = require "./../globals"

# home controller module
exports.getRoot = (req, res)->
  res.redirect "#{globals.prefix}/home"

exports.getHome = (req, res)->

  globals.helpers.getAllModelNames (err, modelsNames)->

    # render template
    data = globals.jade.renderFile "#{globals.viewsDir}/home.jade",
      prefix      : globals.prefix
      modelsNames : modelsNames

    # set content-type
    res.set "Content-Type", "text/html"

    # send data
    res.end data