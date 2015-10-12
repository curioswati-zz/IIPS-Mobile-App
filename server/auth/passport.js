// Load required packages
var passport    = require('passport');
// var JwtStrategy = require('passport-jwt').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var models      = require('../models/index');
var User        = models.User;
var config      = require('../config/config');
var Password    = require('../include/password');

var EXPIRES_IN_MINUTES = 60 * 24;
var SECRET             = process.env.tokenSecret;
var ALGORITHM          = "HS256";
var ISSUER             = "http://localhost:8080/auth";
var AUDIENCE           = "http://localhost:8100/login";

config.jwtSettings = {
      expiresInMinutes: EXPIRES_IN_MINUTES,
      secret          : SECRET,
      algorithm       : ALGORITHM,
      issuer          : ISSUER,
      audience        : AUDIENCE
    };

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.find({
      where: {email: username }
    }).then(function (user, err) {
      if (err)
        { 
          return done(err);
        }
      if (!user) {
        return done(null, false, {message: 'Incorrect username.' });
      }
      if (!(password == user.password)) {
      //if (!Password.validate(password, user.password)) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      return done(null, user, {mesage: 'Login successful'});
    });
  }
));

// Configuration object for JWT strategy
// var JWT_STRATEGY_CONFIG = {
//       secretOrKey      : SECRET,
//       issuer           : ISSUER,
//       audience         : AUDIENCE,
//       auth_token       : "secret",
//       passReqToCallback: false
//     };

// function _onJwtStrategyAuth(jwt_payload, done) {
//   console.log("authenticating");
//   User.findOne({id: jwt_payload.sub}, function(err, user) {
//     if(err) {
//       return done(err, false);
//     }
//     if(user) {
//       done(null, user);
//     }
//     else {
//       done(null, false);
//     }
//   })
//   return next(null, user, {});
// }

// passport.use(new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));
