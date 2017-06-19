// Routes that are protected by authentication.

//TODO: implement user creation system.

const express = require('express'),
      jwt = require('jsonwebtoken'), // used to create, sign, and verify tokens
      mongoose = require('mongoose'),
      bcrypt = require('bcrypt-nodejs');

var Project = require('../models/Project');
var User = require('../models/User');
var settings = require('../settings');

var router = express.Router();

// Simple page rendering

router.get('/signin', function(req, res, next) {
  res.render('signin', {title: 'GalleXy | Sign In'});
});

router.get('/signup', function(req, res, next) {
  res.render('signup', {title: 'GalleXy | Sign Up'});
});

router.get('/signup2', function(req, res, next) {
  res.render('signup2', {title: 'GalleXy |  Sign Up'});
});

// actual auth

router.get('/verify', function(req, res, next) {
  //TODO implement verification
  res.render('verified', {title: 'GalleXy | Sign Up'});
});

// create new user
router.post('/signup', function(req, res, next) {
  //TODO: implement verification
  res.redirect('/signup2');
});


// Token is assigned here
router.post('/signin', function(req, res, next) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      user.comparePassword(req.body.password, function(err, matching) {
        if (matching) {
          var token = jwt.sign(user, settings.secret, {
            expiresInMinutes: 1440 // expires in 24 hours
          });
          // return the information including token as JSON
          res.json({
            success: true,
            token: token
          });
          res.redirect('/profile');
        } else {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
});

// route middleware to verify a token
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, settings.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

router.get('/new', function(req, res, next) {
  res.render('newproject', {title: 'GalleXy | New Project'});
});

router.get('/profile/:KERBEROS/edit', function(req, res, next) {
  //use req.params.ID to access this variable
  res.render('editprofile', {title: 'GalleXy | ' + req.params.KERBEROS});
});

router.get('/profile', function(req, res, next) {
  res.render('profile', {title: 'GalleXy | Profile'}); //change profile to user's email
})

router.get('/signout', function(req, res, next) {
  // expire token
  res.redirect('/');
});

module.exports = router;
