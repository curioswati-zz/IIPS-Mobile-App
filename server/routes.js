var express        = require("express");
var passport       = require('passport');
var router         = express.Router(); 
var models         = require("./models/index");
var User           = models.User;

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/login')
  .post(function(req, res, next) {
    passport.authenticate('local', function(err, user, info){
    if(err){
      return next(err);
    }
    if(user){
      return res.json({token: user.generateJWT()});
    }
    else {
      return res.status(401).json(info);
    }
  }) (req, res, next);
});

module.exports = router;