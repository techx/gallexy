
const jwt = require('jsonwebtoken'),
      crypto = require('crypto'),
      User = require('../models/User'),
      settings = require('../settings');

function generateToken(user) {
  return jwt.sign(user, settings.secret, {
    expiresIn: 10080 //seconds
  });
}

function setUserInfo(request) {
  return {
    _id: request._id,
    email:request.email,
    isAdmin: request.isAdmin
  }
}

module.exports.login = function(req, res, next) {
  const userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT'+generateToken(userInfo),
    user: userInfo
  });
}

module.exports.register = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    return res.status(422).send({error: 'You must enter an email address.'});
  }
  const isAdmin = (email in settings.admins);

  if (!password) {
    return res.status(433).send({ error: 'You must enter a password.'});
  }
  User.findOne({email: email}, function(err, user) {
    if (err) { return next(err); }
    if (user) {return res.status(422).send({error: 'That email address is already in use. '});}
    const user = new User({
      email: email,
      password: password,
      isAdmin: isAdmin,
      verified: false
    });
    user.save(function(err, user) {
      if (err) {return next(err); }
      //TODO configure SMTP THING TO EMAIL USER TO COMPLETE VERIFICATION

      const userInfo = setUserInfo(user);
      res.status(201).json({
        token: 'JWT' + generateToken(userInfo),
        user: userInfo
      });
    });
  });
}

//admin protected routes
module.exports.adminOnly = function(req, res, next) {
  const user = req.user;

  User.findById(user._id, function(err, foundUser) {
    if(err) {
      res.status(422).json({error: 'No user was found'});
      return next(err);
    }

    if(foundUser.isAdmin) {
      return next();
    }

    res.status(401).json({error: 'You are not authorized to view this page'});
  });
}
