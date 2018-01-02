const express = require('express');
const router = express.Router();

const Project = require('../models/Project');


/* IN THIS CONTEXT, API WILL BE DEFINED TO BE THE URLS THAT AREN'T REQUESTS, BUT ARE EXTRA FUNCTIONALITY */


function authenticate(req, res, AuthCallback, UnauthCallback) {
  if (req.isAuthenticated()) {
    AuthCallback(req, res);
  } else {
    UnauthCallback(req, res);
  }
}

// A way to ping the server over HTTP, also a way to test API
router.get('/ping', (req, res, next) => {
  res.status(200).json({'message':'pong'});
});

router.get("/search", (req, res, next) => {
  console.log(req.query);
  res.status(200).json({
    hello:"world"
  });
});

module.exports = router;
