var User = require('../models/User');
var bCrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;
// local passport strategy
module.exports = function(passport) {
  passport.use('signin', new LocalStrategy({
    passReqToCallback : true
  }, function(req, email, password, done) {

    //check the db if the user exists
    User.findOne({'email' : email },
      function(err, user) {
        //if err, then return using the done method
        if (err) {return done(err);}
        if (!user) {
          console.log('User not found with email ' + email);
          return done(null, false, { message: 'User not found' });
        }
        //check if password is invalid
        bCrypt.compare(password, user.password, function(err, res) {
          if (err) {console.log(err);return done(err);}
          console.log(res);
          if (res === true) {
          console.log('successful login');
          return done(null, user);
        } else {
          console.log("invalid password");
          return done(null, false, { message: 'Incorrect password.' });
        }
        });
      });
}));
};
