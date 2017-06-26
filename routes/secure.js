// Routes that are protected by authentication.

//TODO: implement user creation system.

const express = require('express'),
      AuthenticationController = require('../security/authentication'),
      passportService = require('../security/strategies'),
      passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

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
