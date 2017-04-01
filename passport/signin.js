var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var LocalStrategy   = require('passport-local').Strategy;
// local passport strategy
module.exports = function(passport) {
  passport.use('signin', new LocalStrategy({
    passReqToCallback : true
    }, function(req, username, password, done) {

    //check the db if the user exists
    User.findOne({'Username' : username },
      function(err, user) {
        //if err, then return using the done method
        if (err) {return done(err);}
        if (!user) {
          console.log('User not found with username ' + username);
          return done(null, false, { message: 'User not found' });
        }
        //check if password is invalid
        bCrypt.compare(password, user.Password, function(err, res) {
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
