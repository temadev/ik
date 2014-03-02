var Application = require('models/Application');
var Product = require('models/Product');

module.exports = {
  index: function (req, res) {
    res.render('main', {"title": 'Express'});
  },
  about: function (req, res) {
    res.render('about');
  },
  info: function (req, res) {
    res.render('info');
  },
  catalog: function (req, res) {
    console.log(req.route.path);
    res.render('catalog');
  },
  profile: function (req, res) {
    Application.find({ author: req.session.user })
      .lean()
      .populate({path: 'product'})
      .exec(function (err, applications) {
        res.render('profile', { applications: applications, userId: req.session.user });
      })
  }
};