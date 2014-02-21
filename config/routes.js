var checkAuth = require('middleware/CheckAuth'),
  setNav = require('middleware/navigation').currentPath;

var mainCtrl = require('controllers/main'),
  authCtrl = require('controllers/auth'),
  userCtrl = require('controllers/user'),
  catalogCtrl = require('controllers/catalog');

module.exports = function (app) {

//  static pages
  app.get('/', setNav, mainCtrl.index);
  app.get('/about', setNav, mainCtrl.about);
  app.get('/profile', checkAuth, setNav, mainCtrl.profile);

//  authentication
  app.get('/login', setNav, authCtrl.get);
  app.post('/login', authCtrl.post);
  app.post('/logout', authCtrl.logout);

//  users
  app.get('/api/users', checkAuth, userCtrl.list);
  app.get('/api/user/:id', checkAuth, userCtrl.view);

//  catalog
  app.get('/catalog', setNav, catalogCtrl.list);
  app.get('/catalog/:section', setNav, catalogCtrl.view);
  app.get('/product/:product', setNav, catalogCtrl.product);

};
