const mongoose = require('mongoose'),
      schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs');

const settings = require('../settings');
// SCHEMA

const userSchema = schema({
  email: {type: String, required: true, lowercase: true, index: { unique: true }},
  kerberos: {type: String, required: true, lowercase: true, index: { unique: true }}, // I know I can generate kerberos from email, but I wanted to check first
  password: {type: String, required: true},
  admin: {type: Boolean, default: false},
  projects: [{type: String}], //storing the ids
  info: {
    name: {type: String},
    year: {type: Number},
    bio: {type: String},
    picUrl: {type: String} //use AWS BLOB STORAGE??
  },
  security: {
    verified: {type: Boolean, default: false},  //for ensuring the user has the given email, code can be deleted on verification
    code: {type: String}
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
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
}

/**
* Find a user if exists; callback error otherwise
* @param email {string} - email of a potential user
* @param callback {function} - function to be called with err and result
*/
userSchema.statics.getUser = function(err, email, cb) {
  if (err) {
    cb(err);
  } else {
    User.find({ email: email.toLowerCase() }, function(err, results) {
      if (err) {
        cb(err);
      } else if (results.length > 0) {
        cb(null, results[0]);
      } else cb('User not found');
    });
  }
};

/**
* Create a new user
* @param user {object} - user object to be created (must have unique email field)
* @param callback {function} - function to be called with err and result
*/
userSchema.statics.createUser = function (err, user, cb) {
  if (err) {
    cb(err, null);
  } else {
    user.email = user.email.toLowerCase();
    if (!user.email.endsWith("@mit.edu")) {
      cb('Invalid Email', null);
    } else {
      user.kerberos = user.email.substring(0, user.email.indexOf("@mit.edu"));
      //promote to admin if in the secret admin list
      user.admin = settings.admins.includes(user.kerberos);
      User.findOne({ email: user.email }, function (err, user) {
          if (err) {
            cb(err, null);
          } else if (!user) {
            var newUser = new User(user);
            newUser.save(function (err) {
              if (err) {
                cb('Error saving user: ' + err, null);
              } else {
                cb(null, newUser);
              }
            });
          } else {
            cb('User already exists', null);
          }
      });
    }
  }
};

/**
* Update given user
* @param user {object} - new user object (with email as identifier)
* @param callback {function} - function to be called with err and result
*/
userSchema.statics.updateUser = function (err, user, cb) {
  if (err) {
    cb(err);
  } else {
    User.getUser(null, user.email, function (err, oldUser) {
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
  }
};

var User = mongoose.model('User', userSchema);
module.exports = User;
