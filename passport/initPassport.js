const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const settings = require('../settings');

const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function(passport) {
  const jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader(); //required
  jwtOptions.secretOrKey = settings.secret; //required

  const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    var user = users[_.findIndex(users, {id: jwt_payload.id})]
    User.findByID(jwt_payload.id, function(err, user){
      if (err) {
        return done(err);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'No user was found'});
      }
    });
  });

  passport.use(strategy);
  console.log('JWT Auth Strategy Loaded!');
};
