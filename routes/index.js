var express = require('express');
var router = express.Router();

/* TODO implement authentication */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GalleXy', loggedIn: (Math.random() > .5), isAdmin: (Math.random() > .5) });
});

router.get('/project', function(req, res, next) {
  res.render('project', { title: 'GalleXy | Project', progress:1});
});

router.get('/signin', function(req, res, next) {
  res.render('signin', {title: 'GalleXy | Sign In'});
});

router.post('/signin', function(req, res, next) {
  res.redirect('/profile');
});

router.get('/signup', function(req, res, next) {
  res.render('signup', {title: 'GalleXy | Sign Up'});
});

router.post('/signup', function(req, res, next) {
  //TODO: implement verification
  res.redirect('/signup2');
});

router.get('/admin', function(req, res, next) {
  res.render('admin', {title: 'GalleXy | Admin'});
});

router.get('/creator/:KERBEROS', function(req, res, next) {
  res.render('creator', {title: 'GalleXy | ' + req.params.KERBEROS})
});

router.get('/new', function(req, res, next) {
  res.render('newproject', {title: 'GalleXy | New Project'});
});

router.get('/profile/:KERBEROS/edit', function(req, res, next) {
  //use req.params.ID to access this variable
  res.render('editprofile', {title: 'GalleXy | ' + req.params.KERBEROS});
});

router.get('/profile', function(req, res, next) {
  //if authed
  res.render('profile', {title: 'GalleXy | Profile'}); //change profile to user's email
})

router.get('/verify', function(req, res, next) {
  //TODO implement verification
  res.render('verified', {title: 'GalleXy | Sign Up'});
});

router.get('/signup2', function(req, res, next) {
  res.render('signup2', {title: 'GalleXy |  Sign Up'});
});

router.get('/signout', function(req, res, next) {
  // deauthenticate/ expire the user session, and redirect to index page
  res.redirect('/');
});

router.get('/admin', function(req, res, next) {
/* TODO ONLY RENDER PAGE IF AUTHENTCATED, OTHERWISE REDIRECT "You do not have permission to view that page" */
});






module.exports = router;
