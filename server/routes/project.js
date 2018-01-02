const express = require('express');
let router = express.Router();
const Project = require('../models/Project');

//FOR PROTECTED ROUTES
function protect(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/') //TODO CHECK IF SENT BACK TO ORIGIN
  }
}
function authenticate(req, res, AuthCallback, UnauthCallback) {
    if (req.isAuthenticated()) {
        AuthCallback(req, res);
    } else {
        UnauthCallback(req, res);
    }
}

router.get('/', (req, res, next) => {
    authenticate(req, res, (req, res) => {
        res.render('projectView', { title: 'GalleXy | Project', progress: Math.ceil(Math.random() * 100), loggedIn: true, isAdmin: req.user.admin });
    }, (req, res) => {
        res.render('projectView', { title: 'GalleXy | Project', progress: Math.ceil(Math.random() * 100), loggedIn: false, isAdmin: false });
    });
});

router.get('/new', protect, (req, res) => {
        res.render('projectNew', { title: 'GalleXy | New Project', loggedIn: true, isAdmin: req.user.admin });
});

router.post('/new', protect, (req, res, next) => {
    console.log(req.user);
    console.log(req.data);
    console.log(req.team);
});

router.get('/edit', protect, (req, res) => {
        res.render('projectEdit', { title: 'GalleXy | New Project', loggedIn: true, isAdmin: req.user.admin, project: {about:{title:"Cool Project"}}});
});

router.get('/update', protect, (req, res) => {
    res.render('projectUpdate', { title: 'GalleXy | New Project', loggedIn: true, isAdmin: req.user.admin, project: { about: { title: "Cool Project" }} });
});

router.get('/plan', protect, (req, res) => {
    res.render('projectPlanning', { title: 'GalleXy | New Project', loggedIn: true, isAdmin: req.user.admin, project: { about: { title: "Cool Project" } } });
});



module.exports = router;
