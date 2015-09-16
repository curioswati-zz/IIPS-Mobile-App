(function() {
  module.exports = function(prefix, appObject, configObject, modelsArray) {
    appObject.get("" + prefix, require("./routes/home").getRoot);
    appObject.get("" + prefix + "/home", require("./routes/home").getHome);
    appObject.get("" + prefix + "/:model/add", require("./routes/add").getAdd);
    appObject.post("" + prefix + "/:model/add", require("./routes/add").postAdd);
    appObject.get("" + prefix + "/:model/:id", require("./routes/single").getSingle);
    appObject.post("" + prefix + "/:model/:id", require("./routes/single").postSingle);
    return appObject.get("" + prefix + "/:model", require("./routes/list").getList);
  };

}).call(this);
