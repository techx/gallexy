const express = require('express');
const router = express.Router();
const passport = require('passport');
const verifier = require("../controllers/verify");

const Project = require('../models/Project');

const settings = require('../settings');

function authenticate(req, res, AuthCallback, UnauthCallback) {
  if (req.isAuthenticated()) {
    AuthCallback(req, res);
  } else {
    UnauthCallback(req, res);
  }
}

// GET verify page
router.get('/verify', verifier);

// A way to ping the server over HTTP, also a way to test API
router.get('/ping', function(req, res, next) {
  res.status(200).json({'message':'pong'});
});

// create new user
router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/signup2',
  failureRedirect: '/signup'
}));

router.post('/signin', passport.authenticate('signin', {
    successRedirect: '/account',
    failureRedirect: '/signin'
}));

//create new project
router.post('/new', function(req, res, next) {

});

// logout
router.get('/signOut', function(req, res) {
  req.logout();
  res.redirect('back');
});

module.exports = router;
