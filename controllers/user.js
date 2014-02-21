var HttpError = require('lib/error').HttpError;
var User = require('models/User');
var ObjectId = require('lib/mongoose').Types.ObjectId;

module.exports = {
  list: function (req, res, next) {
    User.find({}, function (err, users) {
      if (err) throw err;
      res.json(users);
    });
  },
  view: function (req, res, next) {
    try {
      var id = new ObjectId(req.params.id);
    } catch (e) {
      next(404);
      return;
    }

    User.findById(id, function (err, user) {
      if (err) throw err;
      if (!user) {
        next(new HttpError(404, "User not found"));
        return;
      }
      res.json(user);
    })
  }
};