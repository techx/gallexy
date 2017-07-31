const randomize = require("randomatic");
const mailer = require('./mail');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const settings = require('../settings');

module.exports.verify = function(req, res, next) {

  var email = req.query.kerberos + '@mit.edu';

  User.getUser(email, function(err, user) {
    if (err) {
      res.render('error', {message: 'Could not verify user, please try signing up again in 24 hours.'});
    } else if (!user) {
      res.render('error', {message: 'Could not verify user, please try signing up again in 24 hours.'});
    } else if ((Date.now() - user.security.dateCreated.getTime() ) > settings.verificationExpiration) {       //BUG FIXED: WAS USING WRONG OPERATION TO EXPIRE SECURITY CODES
      res.render('error', {message: 'Verification code expired, please try signing up again'});
    } else {
      if (req.query.code === user.security.code && !user.security.verified) {
        // update user
        user.security.verified = true;
        user.security.code = null;
        user.save(function (err) {
          if (err) {
            res.render('error', {message: 'Could not verify user, please try signing up again in 24 hours.'});
          } else {
            res.render('verified', {title: 'GalleXy | Verify', email: req.query.kerberos});
          }
        });
      } else {
        res.render('error', {message: 'Could not verify user, please try signing up again in 24 hours.'});
      }
    }
  });
};

module.exports.signup = function(req, res, next) {
  // Find a user that has already been verified with the given credentials, if not then resume if creating a new user with the given creds
  var secureCode = randomize('Aa0', 15);
  var user = {
    email: req.body.email,
    password: req.body.password, //TODO check password confirmation on frontend, It's extra computing for the server
    security: {
      verified: false,
      code:secureCode
    }
  };

  User.createUser(user, function(err, newUser) {
    if (err) {
      res.json({message: err});
    } else if (newUser) {
      //If user creation was successful, then we send them an email and redirect them to let them know
      mailer.newUserEmail(newUser);

      res.json({message: "success"});
    } else {
      res.json({message: "Unable to create new user"});
    }
  });
}

//so we're actually going to use cookies instead of LocalStorage
// TODO: IMPLEMENT CSRF Protections

module.exports.signin = function(req, res, next) {
  //only continue with sign in request if an email and a password is provided
  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;

    User.getUser(email, function(err, user) {
      if (err) {
        res.json({message: "Database error"});
      } else if (!user) {
        res.json({message: "Could not sign in"});
      } else {
        user.comparePassword(password, function(err, isMatch) {
          if (err) {
            res.json({message: "Database error"});
          } else if (isMatch) {
            var payload = {id: user.id, kerberos: user.kerberos};
            var token = jwt.sign(payload, settings.secret);
            res.json({message: "success", token: token, kerberos: user.kerberos});
          } else {
            res.json({message: "Wrong password"});
          }
        });
      }
    });

  } else {
    res.json({message:"Invalid request, email or password missing"});
  }
};
