(function() {
  var globals;

  globals = require("./../globals");

  exports.getRoot = function(req, res) {
    return res.redirect("" + globals.prefix + "/home");
  };

  exports.getHome = function(req, res) {
    return globals.helpers.getAllModelNames(function(err, modelsNames) {
      var data;
      data = globals.jade.renderFile("" + globals.viewsDir + "/home.jade", {
        prefix: globals.prefix,
        modelsNames: modelsNames
      });
      res.set("Content-Type", "text/html");
      return res.end(data);
    });
  };

}).call(this);
