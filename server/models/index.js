var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = "dev";
var config    = require('../database.json')[env];
var password  = config.password ? config.password : null;

var sequelize = new Sequelize(
	config.database,
	config.user,
	config.password,
	{
        logging: console.log,
        define: {
            timestamps: false
        }
  },
	{
		host: 'localhost',
		dialect: 'mysql',
		pool: {
		    max: 5,
		    min: 0,
		    idle: 10000
		  },
	},
	config
);

var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;