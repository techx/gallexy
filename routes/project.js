const express = require('express');
var router = express.Router();
const Project = require('../models/Project');

//FOR PROTECTED ROUTES
function protect(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/')
  }
}
function authenticate(req, res, AuthCallback, UnauthCallback) {
    if (req.isAuthenticated()) {
        AuthCallback(req, res);
    } else {
        UnauthCallback(req, res);
    }
}

router.get('/', function (req, res, next) {
    authenticate(req, res, (req, res) => {
        res.render('projectView', { title: 'GalleXy | Project', progress: Math.ceil(Math.random() * 100), loggedIn: true, isAdmin: req.user.admin });
    }, (req, res) => {
        res.render('projectView', { title: 'GalleXy | Project', progress: Math.ceil(Math.random() * 100), loggedIn: false, isAdmin: false });
    });
});

router.get('/new', protect,  function (req, res) {
        res.render('projectNew', { title: 'GalleXy | New Project', loggedIn: true, isAdmin: req.user.admin });
});

router.post('/new', protect, function (req, res, next) {

});

router.get('/edit', protect,  function (req, res) {
        res.render('projectEdit', { title: 'GalleXy | New Project', loggedIn: true, isAdmin: req.user.admin });
});

router.get('/update', protect,  function (req, res) {
        res.render('projectUpdate', { title: 'GalleXy | New Project', loggedIn: true, isAdmin: req.user.admin });
});

router.get('/planning', protect,  function (req, res) {
        res.render('projectPlanning', { title: 'GalleXy | New Project', loggedIn: true, isAdmin: req.user.admin });
});



module.exports = router;
