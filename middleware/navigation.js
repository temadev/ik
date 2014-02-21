var config = require('config');

module.exports = {
  currentPath: function (req, res, next) {
    var url = req.route.path,
      url_path = url.split('/');

    if (url_path[0] == '') {
      res.locals.path = '/' + url_path[1];
    } else {
      res.locals.path = '/' + url_path[0];
    }

    return next();
  },
  mainNavigation: function (req, res, next) {
    res.locals.mainNav = config.get('navigation:main');
    return next();
  }
};