var express        = require("express");
var passport       = require('passport');
var router         = express.Router(); 
var models         = require("./models/index");
var nodemailer     = require('nodemailer');
var validator      = require('validator');
var User           = models.User;

var emailConfig = require('./config/email');
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport(emailConfig.options);

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

router.route('/forgot_password')
  .post(function(req, res, next) {
      var email = req.body.email;
      console.log("[" + Date.now() + "] Forgot Password request for email: ", email);
      if (!validator.isEmail(email)) {
        res.json({
            status: 402,
            error: "Invalid Email Address",
            message: "Invalid Email Address"
        });
      } else {

        // Setting reciever for the email
        emailConfig.mailOptions.to = email;

        var low = 1, high = 9999;
        var passcode = Math.floor(Math.random() * (high - low) + low);

        // Setting text for the email
        emailConfig.mailOptions.text = "Please enter this passcode in the IIPS APP: " + passcode;

        // send mail with defined transport object
        transporter.sendMail(emailConfig.mailOptions, function(error, info){
            if(error){
                res.json({ 
                    error: error,
                    message: 'Error sending message'
                });
                console.log(error);
            } else {
                console.log('Message sent: ' + info.response);
                res.json({ 
                    status: 200,
                    success: 'Message successfully sent to: ' + email,
                    passcode: passcode
                });
            }
        });
      
      }
});

module.exports = router;
