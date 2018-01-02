const express = require('express');
let router = express.Router();
const Project = require('../models/Project');


function authenticate(req, res, AuthCallback, UnauthCallback) {
  if (req.isAuthenticated()) {
    AuthCallback(req, res);
  } else {
    UnauthCallback(req, res);
  }
}

/* ROOT ROUTE, main gallery page */
router.get('/', (req, res, next) => {
  authenticate(req, res, (req, res) => {
    res.render('index', {
      title: 'GalleXy',
      loggedIn:true,
      isAdmin: req.user.admin,
      projects:[]
    });
  }, (req, res) => {
    res.render('index', {
      title: 'GalleXy',
      loggedIn:false,
      isAdmin:false,
      projects:[]
    });
  });
});


module.exports = router;
