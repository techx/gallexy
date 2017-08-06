const express = require('express');
var router = express.Router();
const User = require('../models/User'); //TODO: INCORPORATE INFORMATION FROM DB INTO USER ROUTES (PROFILE + ACCOUNT)


// TODO: MAKE THIS INTO A SIMPLE MIDDLEWARE (SINCE MOST OF THE TIME I'M JUST REDIRECTING YOU TO HOME
  //FOR PROTECTED ROUTES
function authenticate(req, res, AuthCallback, UnauthCallback) {
  if (req.isAuthenticated()) {
    AuthCallback(req, res);
  } else {
    UnauthCallback(req, res);
  }
}

/* ROOT ROUTE, main gallery page */
router.get('/', function(req, res, next) {
  authenticate(req, res, (req, res) => {
    res.render('index', { title: 'GalleXy', loggedIn:true, isAdmin: req.user.admin });
  }, (req, res) => {
    res.render('index', { title: 'GalleXy', loggedIn:false, isAdmin:false });
  });
});

/* AUTHENTICATION ROUTES */
router.get('/signin', function(req, res, next) {
  authenticate(req, res, (req, res) => {
    res.redirect('/');
  }, (req, res) => {
    res.render('signin', {title: 'GalleXy | Sign In', loggedIn:false, isAdmin:false});
  });
});

router.get('/signup', function(req, res, next) {
  authenticate(req, res, (req, res) => {
    res.redirect('/');
  }, (req, res) => {
    res.render('signup', {title: 'GalleXy | Sign Up', loggedIn:false, isAdmin:false});
  });
});

/* RENDERS AFTER YOU SUCCESSFULLY SIGNUP */
router.get('/signup2', function(req, res, next) {
  res.render('signup2', {title: 'GalleXy |  Sign Up', loggedIn:false, isAdmin:false});
});

/* GET project routes */
router.get('/project', function (req, res, next) {
  authenticate(req, res, (req, res) => {
    res.render('project', { title: 'GalleXy | Project', progress: Math.ceil(Math.random()*100), loggedIn: true, isAdmin: req.user.admin });
  }, (req, res)=>{
    res.render('project', { title: 'GalleXy | Project', progress: Math.ceil(Math.random() * 100), loggedIn: false, isAdmin: false });
  });
});

/* CREATE A NEW PROJECT */
router.get('/new', function(req, res, next) {
  authenticate(req, res, (req, res) => {
    res.render('newproject', { title: 'GalleXy | New Project', loggedIn: true, isAdmin: req.user.admin });
  }, (req, res) => {
    res.redirect('/');
  });

});

/* GET user routes */
// if profile requested does not belong to the person, then render as a creator, and not as a profile
router.get('/account', function(req, res, next) {
  authenticate(req, res, (req, res) => {
    res.render('account', { title: 'GalleXy | ' + req.user.email, loggedIn: true, isAdmin: req.user.admin}); 
  }, (req, res) => {
    res.redirect('/'); 
  });
});


router.get('/edit/account', function (req, res, next) {
  authenticate(req, res, (req, res) => {
    res.render('editaccount', { title: 'GalleXy | ' + req.user.email, loggedIn: true, isAdmin: req.user.admin });
  }, (req, res) => {
    res.redirect('/');
  });
});

/* DISPLAYS A USER PROFILE BASED ON THE USER'S EMAIL */
router.get('/profile', function(req, res, next) {
  authenticate(req, res, (req, res) => {
    res.render('profile', { title: 'GalleXy | ' + req.query.email, loggedIn: true, isAdmin: req.user.admin });
  }, (req, res) => {
    res.render('profile', { title: 'GalleXy | ' + req.query.email, loggedIn: false, isAdmin: false });
  });
});

/* ADMIN PAGE FOR MANAGING PROJECTS */
/* TODO MAKE TYPES OF ADMINS FOR DIFFERENT TECHX ORGANIZATIONS */

router.get('/admin', function(req, res, next) {
  authenticate(req, res, (req, res)=> {
    if (req.user.admin) {
      res.render('admin', { title: 'GalleXy | ' + req.query.email, loggedIn: true, isAdmin: true });
    } else {
      res.redirect('/');
    }
  }, (req, res) => {
    res.redirect('/');
  });
});

module.exports = router;