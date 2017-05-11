var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GalleXy' });
});
router.get('/project', function(req, res, next) {
  res.render('project', { title: 'GalleXy - Project'})
});
module.exports = router;
