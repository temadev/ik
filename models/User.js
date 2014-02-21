var crypto = require('crypto');
var async = require('async');
var util = require('util');

var mongoose = require('lib/mongoose'),
  Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    'default': ''
  },
  role: {
    type: String,
    'default': 'user'
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
});

userSchema.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

userSchema.virtual('password')
  .set(function (password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function (password) {
  return this.encryptPassword(password) == this.hashedPassword;
};

userSchema.statics.authorize = function (email, password, callback) {
  var User = this;

  async.waterfall([
    function (callback) {
      User.findOne({ email: email }, callback)
    },
    function (user, callback) {
      if (user) {
        if (user.checkPassword(password)) {
          callback(null, user);
        } else {
          callback(new AuthError("Пароль неверен"));
        }
      } else {
        callback(new AuthError("Ошибка авторизации"));
      }
    }
  ], callback);
};

module.exports = mongoose.model('User', userSchema);


function AuthError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AuthError);

  this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'HttpError';

exports.AuthError = AuthError;