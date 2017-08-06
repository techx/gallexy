const mongoose = require('mongoose'),
      schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs');

const settings = require('../settings');
// SCHEMA

const userSchema = schema({
  email: {type: String, required: true, lowercase: true, index: { unique: true }},
  password: {type: String, required: true},
  admin: {type: Boolean, default: false},
  projects: [{type: String}], //storing the ids use ObjectID
  info: {
    name: {type: String},
    year: {type: Number},
    study: {type: String},
    bio: {type: String},
    picUrl: {type: String}, //use AWS BLOB STORAGE??
    resumeUrl : {type:String}
  },
  security: {
    verified: {type: Boolean, default: false},  //for ensuring the user has the given email, code can be deleted on verification
    code: {type: String},
    dateCreated: {type: Date, default: Date.now}
  }
});

// METHODS

// encryption (Salted hash)

userSchema.pre('save', function(cb) {
  const user = this,
        SALT_FACTOR = 5;

  if (!user.isModified('password')) return cb();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return cb(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return cb(err);
      user.password = hash;
      cb();
    });
  });
});


userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
}

/**
* Verify that a given user object can be created
* @param user {object} - user to be tested
* @return {boolean} - if user can be saved
*/

userSchema.statics.verify = function(user) {
  if(user.email && user.password) {
    user.email = user.email.toLowerCase();

    return user.email.endsWith("@mit.edu"); //TODO add more specific conditions
  } else {
    return false;
  }
};

/**
* Find a user if exists; callback error otherwise
* @param email {string} - email of a potential user
* @param callback {function} - function to be called with err and result
*/
userSchema.statics.getUser = function(email, cb) {
  User.find({ email: email.toLowerCase() }, function(err, results) {
    if (err) {
      cb(err);
    } else if (results.length > 0) {
      cb(null, results[0]);
    } else cb('User not found');
  });
};

/**
* Create a new user
* @param user {object} - user object to be created (must have unique email field)
* @param callback {function} - function to be called with err and result
*/
userSchema.statics.createUser = function (user, cb) {

  if (User.verify(user)) {
    user.admin = settings.admins.includes(user.email);
    User.findOne({ email: user.email}, function(err, someUser) {
      if (err) {
        cb(err, null);
      } else if (!someUser) {
        var newUser = new User(user);
        console.log(newUser);
        newUser.save(function (err) {
          if (err) {
            cb('Error saving user: ' + err, null);
          } else {
            cb(null, newUser);
          }
        });
      } else {
        if (someUser.security.verified) {
          cb('Verified user already exists', null);
        } else if (Date.now() - someUser.security.dateCreated < settings.verificationExpiration) {
          cb('24 hours has not passed since last attempt to create account, please wait another day for current verification code to expire.');
        } else{
          User.updateUser(user, cb);
        }
      }
    });

  } else {

  }
};

/**
* Update given user
* @param user {object} - new user object (with email as identifier)
* @param callback {function} - function to be called with err and result
*/
userSchema.statics.updateUser = function (user, cb) {
  User.getUser(user.email, function (err, oldUser) {
    if (err) {
      cb(err);
    } else {
      for (field in User.schema.paths) {
        oldUser[field.split(".")[0]] = user[field.split(".")[0]];
      };
      oldUser.save(function (err) {
        if (err) cb('Error saving user: ' + err);
        else cb(null, oldUser);
      });
    }
  });
};

var User = mongoose.model('User', userSchema);
module.exports = User;
