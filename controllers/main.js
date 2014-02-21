module.exports = {
  index: function (req, res) {
    res.render('main', {"title":'Express'});
  },
  about: function (req, res) {
    res.render('about');
  },
  catalog: function (req, res) {
    console.log(req.route.path);
    res.render('catalog');
  },
  profile: function (req, res) {
    res.render('profile', {
      userId: req.session.user
    });
  }
};