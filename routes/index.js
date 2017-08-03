const express = require('express');
var router = express.Router();

//Routes that anyone should be able to access
function authenticate(req, res, AuthCallback, UnauthCallback) {
  if (req.isAuthenticated()) {
    AuthCallback(req, res);
  } else {
    UnauthCallback(req, res);
  }
}

router.get('/', function(req, res, next) {
  authenticate(req, res, (req, res) => {
    res.render('index', { title: 'GalleXy', loggedIn:true, isAdmin: req.user.admin });
  }, (req, res) => {
    res.render('index', { title: 'GalleXy', loggedIn:false, isAdmin:false });
  });
});

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
    res.render('account', { title: 'GalleXy | ' + req.user.kerberos, loggedIn: true, isAdmin: req.user.admin}); 
  }, (req, res) => {
    res.redirect('/'); 
  });
});

router.get('/profile', function(req, res, next) {
  authenticate(req, res, (req, res) => {
    res.render('profile', { title: 'GalleXy | ' + req.query.kerberos, loggedIn: true, isAdmin: req.user.admin });
  }, (req, res) => {
    res.render('profile', { title: 'GalleXy | ' + req.query.kerberos, loggedIn: false, isAdmin: false });
  });
});

module.exports = router;
