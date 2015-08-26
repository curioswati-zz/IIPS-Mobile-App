// import modules
var express        = require("express");
var bodyParser     = require("body-parser");
var methodOverride = require("method-override");
var http           = require('http');
var _              = require('lodash');
var mysql          = require('mysql');

// for login
var passport = require('passport');

// for Debugging
var debug          = require('debug')('express-example');

// required for creating REST end points
var restful       = require('sequelize-restful');

// Create the application
var app = express();

// env variables
var env  = app.get('env') == 'development' ? 'dev' : app.get('env');
var port = process.env.PORT || 8080;

// Add middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(passport.initialize());

// add CORS support
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Connect to mySQL
var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'root'
	});

connection.connect();

// load routes
var router = require('./routes');

// load all models
app.models      = require('./models/index');
require('./config/passport');

// load routes
app.use(restful(app.models.sequelize));
app.use('/auth', router);

app.models.sequelize
	.sync()
	.then(function () {
		var server = app.listen(port, function() {
			console.log("listening at http:localhost:%s", port);
		    debug('Express server listening on port ' + server.address().port);
	  });
	});
// connection.end();