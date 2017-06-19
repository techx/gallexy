const express = require('express');
var router = express.Router();

//Routes that anyone should be able to access

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GalleXy', loggedIn: (Math.random() > .5), isAdmin: (Math.random() > .5) });
});

router.get('/project', function(req, res, next) {
  res.render('project', { title: 'GalleXy | Project', progress:1});
});

router.get('/creator/:KERBEROS', function(req, res, next) {
  res.render('creator', {title: 'GalleXy | ' + req.params.KERBEROS})
});

module.exports = router;
