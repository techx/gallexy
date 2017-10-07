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
    public: {type: Boolean, default: true},
    name: {type: String},
    year: {type: Number},
    study: {type: String},
    school: {type: String},
    bio: {type: String},
    picURL: {type: String}, //use AWS BLOB STORAGE??
    resumeURL : {type:String}
  },
  security: {
    verified: {type: Boolean, default: false},  //for ensuring the user has the given email, code can be deleted on verification
    code: {type: String},
    dateCreated: {type: Date, default: Date.now}
  }
});

// METHODS

// encryption (Salted hash)

userSchema.pre('save', (next) => {
  const user = this,
        SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});


userSchema.methods.comparePassword = (candidatePassword, next) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return next(err); }
    next(null, isMatch);
  });
}

userSchema.statics.verify = (user) => {
  if(user.email && user.password) {
    user.email = user.email.toLowerCase();
    // Testing on a regex, not worried about effeciency on small input.
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(user.email);
  } else {
    return false;
  }
};

userSchema.statics.getUser = (checkEmail, next) => {
  User.findOne({ email: checkEmail.toLowerCase() }, (err, result) => {
    if (err) {
      next(err);
    } else {
      next(null, result);
    }
  });
};

userSchema.statics.createUser = (user, next) => {

  if (User.verify(user)) {
    user.admin = settings.admins.includes(user.email);
    User.findOne({ email: user.email}, (err, someUser) => {
      if (err) {
        next(err);
      } else if (!someUser) {
        let newUser = new User(user);
        newUser.save((err) => {
          if (err) {
            next('Error saving user: ' + err, null);
          } else {
            next(null, newUser);
          }
        });
      } else {
        if (someUser.security.verified) {
          next('Verified user already exists', null);
        } else if (Date.now() - someUser.security.dateCreated < settings.verificationExpiration) {
          next('24 hours has not passed since last attempt to create account, please wait another day for current verification code to expire.');
        } else{
          User.updateUser(user, next);
        }
      }
    });

  } else {

  }
};

userSchema.statics.updateUser = (user, next) => {
  User.getUser(user.email, (err, oldUser) => {
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
};

let User = mongoose.model('User', userSchema);
module.exports = User;
