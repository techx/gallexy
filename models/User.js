const mongoose = require('mongoose'),
      schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs');

// SCHEMA

var userSchema = schema({
  email: {type: String, required: true, lowercase: true, index: { unique: true }},
  pass: {type: String, required: true},
  isAdmin: {type: Boolean, default: false},
  projects: [{type: String}], //storing the ids
  verified: {type: Boolean, default: false},
  info: {
    name: {type: String},
    year: {type: Number},
    bio: {type: String},
    picUrl: {type: String} //use AWS BLOB STORAGE??
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
},
{
  timestamps: true
});

// METHODS


// encryption (Salted hash)
userSchema.pre('save', function(next) {
  const user = this,
        SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
})

userSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return next(err); }
    next(null, isMatch);
  });
}

/**
* Find a user if exists; callback error otherwise
* @param email {string} - email of a potential user
* @param callback {function} - function to be called with err and result
*/
userSchema.statics.getUser = function(err, email, next) {
  if (err) {
    next(err);
  } else {
    User.find({ email: email.toLowerCase() }, function(err, results) {
      if (err) {
        next(err);
      } else if (results.length > 0) {
        next(null, results[0]);
      } else next('User not found');
    });
  }
};

/**
* Create a new user
* @param user {object} - user object to be created (must have unique email field)
* @param callback {function} - function to be called with err and result
*/
userSchema.statics.createUser = function (err, user, next) {
  if (err) {
    next(err);
  } else {
    user.email = user.email.toLowerCase();
    user.isAdmin = false;
    User.find({ email: user.email }, function (err, results) {
        if (err) {
          next(err);
        } else if (results.length === 0) {
          var newUser = new User(user);
          newUser.save(function (err) {
            if (err) next('Error saving user: ' + err);
            else next(null, newUser);
          });
        } else next('User already exists');
    });
  }
};

/**
* Update given user
* @param user {object} - new user object (with email as identifier)
* @param callback {function} - function to be called with err and result
*/
userSchema.statics.updateUser = function (err, user, next) {
  if (err) {
    next(err);
  } else {
    User.getUser(null, user.email, function (err, oldUser) {
      if (err) {
        next(err);
      } else {
        for (field in User.schema.paths) {
          oldUser[field.split(".")[0]] = user[field.split(".")[0]];
        };
        oldUser.save(function (err) {
          if (err) next('Error saving user: ' + err);
          else next(null, oldUser);
        });
      }
    });
  }
};

var User = mongoose.model('User', userSchema);
module.exports = User;
