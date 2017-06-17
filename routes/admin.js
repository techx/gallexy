/* Database management page, protected and only accessable to admins */
var express = require('express');
var router = express.Router();

router.get('/admin', function(req, res, next) {
/* TODO ONLY RENDER PAGE IF AUTHENTCATED, OTHERWISE REDIRECT "You do not have permission to view that page" */
  res.render('admin', {title: 'GalleXy | Admin'});
});

module.exports = router;
