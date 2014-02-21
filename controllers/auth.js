var async = require('async');
var HttpError = require('lib/error').HttpError;
var User = require('models/User');

module.exports = {
  get: function (req, res) {
    if(!req.session.user){
      res.render('auth/login');
    } else {
      res.redirect('/profile');
    }
  },
  post: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    User.authorize(email, password, function (err, user) {
      if (err) {
        if (err instanceof User.AuthError) {
          next(new HttpError(403, err.message));
          return;
        } else {
          next(err);
          return;
        }
      }

      req.session.user = user._id;
      res.redirect('/profile');
    });
  },
  logout: function (req, res) {
    req.session.destroy();
    res.redirect('/');
  }
};