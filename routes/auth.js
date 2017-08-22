const express = require('express');
var router = express.Router();
const User = require('../models/User'); //TODO: INCORPORATE INFORMATION FROM DB INTO USER ROUTES (PROFILE + ACCOUNT)
const passport = require('passport');
const verifier = require("../controllers/verify");

//FOR PROTECTED ROUTES
function authenticate(req, res, AuthCallback, UnauthCallback) {
    if (req.isAuthenticated()) {
        AuthCallback(req, res);
    } else {
        UnauthCallback(req, res);
    }
}


/* AUTHENTICATION ROUTES */
router.get('/signin', function (req, res, next) {
    authenticate(req, res, (req, res) => {
        res.redirect('/');
    }, (req, res) => {
        res.render('signin', { title: 'GalleXy | Sign In', loggedIn: false, isAdmin: false });
    });
});

router.get('/signup', function (req, res, next) {
    authenticate(req, res, (req, res) => {
        res.redirect('/');
    }, (req, res) => {
        res.render('signup', { title: 'GalleXy | Sign Up', loggedIn: false, isAdmin: false });
    });
});


// create new user
router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/auth/signup2',
    failureRedirect: '/auth/signup'
}));

router.post('/signin', passport.authenticate('signin', {
    successRedirect: '/user/account',
    failureRedirect: '/auth/signin'
}));

// logout
router.get('/signout', function (req, res) {
    req.logout();
    res.redirect('back');
});

// GET verify page
router.get('/verify', verifier);


/* RENDERS AFTER YOU SUCCESSFULLY SIGNUP */
router.get('/signup2', function (req, res, next) {
    res.render('signup2', { title: 'GalleXy |  Sign Up', loggedIn: false, isAdmin: false });
});


module.exports = router;
