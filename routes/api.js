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

router.post('/edit/account', function (req, res, next) {
  authenticate(req, res, (req, res) => {
    res.render('account', { title: 'GalleXy | ' + req.user.email, loggedIn: true, isAdmin: req.user.admin });
    console.log("We've got a form action");
    console.log(req.body.name);
    console.log(req.body.class);
    console.log(req.body.study);
    console.log(req.body.bio);        //we got the data
  }, (req, res) => {
    res.redirect('/');
  });
});

module.exports = router;
