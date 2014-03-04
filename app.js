
/**
 * Module dependencies.
 */

var config = require('config');

var express = require('express'),
  http = require('http'),
  path = require('path');

var log = require('lib/logger')(module),
  HttpError = require('lib/error').HttpError,
  mongoose = require('lib/mongoose');

var app = express();

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());

if (app.get('env') == 'development') {
  app.use(express.logger('dev'));
} else {
  app.use(express.logger('default'));
}

app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser()); // req.cookies
app.use(require('less-middleware')({ src: path.join(__dirname, 'client') }));
app.use(express.static(path.join(__dirname, 'client')));

var MongoStore = require('connect-mongo')(express);
//var RedisStore = require('connect-redis')(express);

var MongoClient = require("mongodb").MongoClient;
var Yams = require('yams');

var store = new Yams(function (callback) {
  //this will be called once, you must return the collection sessions.
  MongoClient.connect('mongodb://nodejitsu:82dd51b1327aa3bfefcc21fe48edaddb@troup.mongohq.com:10014/nodejitsudb9577575034', function (err, db) {
    if (err) return callback(err);

    var sessionsCollection = db.collection('sessions')

    //use TTL in mongodb, the document will be automatically expired when the session ends.
    sessionsCollection.ensureIndex({expires:1}, {expireAfterSeconds: 0}, function(){});

    callback(null, sessionsCollection);
  });
});

app.use(express.session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: store
//  store: new RedisStore({ url: config.get('redis:url') })
}));

app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadUser'));
app.use(require('middleware/navigation').mainNavigation);

app.use(app.router);
require('config/routes')(app);

app.use(function(err, req, res, next) {
  if (typeof err == 'number') { // next(404)
    err = new HttpError(err)
  }

  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
    if (app.get('env') == 'development') {
      express.errorHandler()(err, req, res, next);
    } else {
      log.error(err);
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }
});

var port = process.env.PORT || config.get('port');
app.listen(port, function(){
  log.info('Express server listening on port ' + port);
});
