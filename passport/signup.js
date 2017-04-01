var passport = require('passport');
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
    }, function(req, username, password, done) {
      var findOrCreateUser = function() {

      User.findOne({'Username' : username}, function(err, user) {
        if(err) {
          console.log('Error on signup: ' + err);
          return done(err);
        }
        // check if user already exists
        if(user) {
          console.log("User already exists");
          return done(null, false, {message: 'Username already taken'});
        } else {
          //check for email here
          User.findOne({'Email' : req.body.email}, function(err, invalid) {
            if(err) {
              console.log('Error on signup: ' + err);
              return done(err);
            }
            if (invalid && invalid.email !== undefined) {
              console.log(invalid.email);
              console.log("Email already in use");
              return done(null, false, {message: 'Email already in use'});
            }
            if (!invalid || invalid.email == undefined) {
              if (password === req.body.passwordConfirm) {
                var newUser = new User();
                newUser.Username = username;
                newUser.Password =  bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
                newUser.Email = req.body.email;
                newUser.save(function(err) {
                  if (err) {
                    console.log("error saving user");
                    throw err;
                  }
                  console.log('New user created');
                  return done(null, newUser);
                  });
                } else {
                  return done(null,false, {message: 'Passwords do not match'});
                }
              }
            });
          }
      });
    };
  process.nextTick(findOrCreateUser);
  }));
};
