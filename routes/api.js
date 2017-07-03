const express = require('express');
const randomize = require("randomatic");
var   nodemailer = require("nodemailer");
const User = require('../models/User');
const Project = require('../models/Project');

const router = express.Router();

const settings = require('../settings');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(settings.mailTransporter);

// setup email data with unicode symbols


// GET verify page
router.get('/verify', function(req, res, next) {
  //TODO IGNORE THIS STUFF FOR NOW UNTIL SMTP IS SETUP.
  //TODO implement verification
  //verify by asking for req.query.email and req.query.code
  //and checking code.
  //test code as follows: /api/verify?email=alvareza&code=18274
  res.render('verified', {title: 'GalleXy | Sign Up', email: req.query.email});
});

//Pretty much every API route will have a 'message', so the status of the message can be resloved
router.get('/ping', function(req, res, next) {
  res.status(200).json({'message':'pong'});
});

// create new user
router.post('/signup', function(req, res, next) {
  // Find a user that has already been verified with the given credentials, if not then resume if creating a new user with the given creds
  var secureCode = randomize('Aa0', 10);
  var user = {
    email: req.body.email,
    password: req.body.password, //TODO check password confirmation on frontend, It's a precaution and extra computing for the server
    security: {
      verified: false,  //for ensuring the user has the given email, code can be deleted on verification
      code:secureCode
    }
  };
  User.createUser(null, user, function(err, newUser) {
    if (err) {
      res.json({message: err});
    } else if (newUser) {
      var mailOptions = {
          from: '"GalleXy" <' + settings.mailTransporter.auth.user + '>', // sender address
          to: newUser.email, // list of receivers
          subject: 'Confirm your new GalleXy account', // Subject line
          text: 'Go to ' + settings.appURL + '/api/verify?kerberos=' + newUser.kerberos+ ",code="+newUser.security.code + ' to finish the account creation process.\n We won\'t send you any more emails unless you tell us to.\nPowered by TechX ', // plain text body
          html: '<p>Go to <a href="' + settings.appURL + '/api/verify?kerberos=' + newUser.kerberos+ ",code="+newUser.security.code + '">this link</a> to finish the account creation process</p><p>We won\'t send you any more emails unless you tell us to. \nPowered by techX</p>' // html body
      };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
      });
      res.redirect('/signup2');
      //SEND EMAIL HERE
    } else {
      res.json({message: "unable to create new user"});
    }
  });
});

// Token is assigned here
router.post('/signin');

//create new project
router.post('/new', function(req, res, next) {

});

router.get('/signout', function(req, res, next) {
  // expire token
  res.redirect('/');
});

module.exports = router;
