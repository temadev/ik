var checkAuth = require('middleware/CheckAuth'),
  setNav = require('middleware/navigation').currentPath;

var mainCtrl = require('controllers/main'),
  authCtrl = require('controllers/auth'),
  userCtrl = require('controllers/user'),
  catalogCtrl = require('controllers/catalog'),
  applicationCtrl = require('controllers/application');

module.exports = function (app) {

//  static pages
  app.get('/', setNav, mainCtrl.index);
  app.get('/about', setNav, mainCtrl.about);
  app.get('/info', setNav, mainCtrl.info);
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


  app.post('/application/create', applicationCtrl.create);
  app.get('/application/admin', applicationCtrl.admin);
  app.get('/application/list', applicationCtrl.list);
  app.get('/application/view/:id', applicationCtrl.view);
  app.post('/application/update', applicationCtrl.update);

};
