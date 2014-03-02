var HttpError = require('lib/error').HttpError;
var Section = require('models/Section');
var Product = require('models/Product');
var Application = require('models/Application');
var async = require('async');
var ObjectId = require('lib/mongoose').Types.ObjectId;

module.exports = {
  admin: function (req, res) {
    // здесь выводим все конкурсы
  },
  list: function (req, res) {

  },
  view: function (req, res) {
    // здесь активный конкурс
    try {
      var id = new ObjectId(req.params.id);
    } catch (e) {
      next(404);
      return;
    }

    Application.findById(id)
      .populate('product author')
      .exec(function (err, application) {
        if (err) throw err;
        if (!application) {
          next(new HttpError(404, "Application not found"));
          return;
        }
        var dateEnd = new Date(application.created);
        dateEnd.setMonth(dateEnd.getMonth() + 1);
        res.render('application/view', {application: application, dateEnd: dateEnd });
      })
  },
  create: function (req, res) {
    // сюда отправляем заявку
    var product_id = new ObjectId(req.body.id);
    if (req.session.user) {
      Product.findById(product_id, function (err, product) {
        Application.create({product: product, title: req.body.title, status: '1', payment: '1', author: req.session.user }, function (err, application) {
          if (err) throw err;
          application.save(
            res.redirect('/profile')
          );
        });
      });
    } else {
      res.send({});
    }
  },
  update: function (req, res) {
    // сюда отправляем обновленные данные
  }
};