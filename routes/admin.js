/* Database management page, protected and only accessable to admins */
const express = require('express'),
      jwt = require('jsonwebtoken'), // used to create, sign, and verify tokens
      mongoose = require('mongoose');

var Project = require('../models/Project');
var User = require('../models/User');

var router = express.Router();

router.get('/admin', function(req, res, next) {
/* TODO ONLY RENDER PAGE IF AUTHENTCATED, OTHERWISE REDIRECT "You do not have permission to view that page" */
  res.render('admin', {title: 'GalleXy | Admin'});
});

module.exports = router;
