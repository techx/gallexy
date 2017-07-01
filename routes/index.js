const express = require('express');
var router = express.Router();

//Routes that anyone should be able to access

/* GET main page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GalleXy', loggedIn: (Math.random() > .5), isAdmin: (Math.random() > .5) });
});

/* GET auth routes */
router.get('/signin', function(req, res, next) {
  res.render('signin', {title: 'GalleXy | Sign In'});
});

router.get('/signup', function(req, res, next) {
  res.render('signup', {title: 'GalleXy | Sign Up'});
});

router.get('/signup2', function(req, res, next) {
  res.render('signup2', {title: 'GalleXy |  Sign Up'});
});

/* GET project routes */
router.get('/project', function(req, res, next) {
  res.render('project', { title: 'GalleXy | Project', progress:1});
});

router.get('/new', function(req, res, next) {
  res.render('newproject', {title: 'GalleXy | New Project'});
});

/* GET user routes */
// if profile requested does not belong to the person, then render as a creator, and not as a profile
router.get('/profile', function(req, res, next) {
  res.render('creator', {title: 'GalleXy | ' + req.query.kerberos}); //change profile to user's email
})

module.exports = router;
