var HttpError = require('lib/error').HttpError;
var Section = require('models/Section');
var Product = require('models/Product');
var async = require('async');

module.exports = {
  list: function (req, res, next) {
    Section.find({}, function (err, sections) {
      if (err) throw err;

      Product.find({ promo: true }, function (err, products) {
        if (err) throw err;
        res.render('catalog', { sections: sections, products: products });
      });
    });
  },
  view: function (req, res, next) {
    Section.find({}, function (err, sections) {
      if (err) throw err;
      Section.findOne({ url: req.params.section }, function (err, section) {
        if (err) throw err;
        if (!section) {
          next(new HttpError(404, "Section not found"));
          return;
        }
        Product.find({ sections: section }, function (err, products) {
          if (err) throw err;
          res.render('catalog/item', { section: section, sections: sections, products: products });
        });
      });
    });
  },
  product: function (req, res, next) {
    Section.find({}, function (err, sections) {
      if (err) throw err;
      Product.findOne({ url: req.params.product }, function (err, product) {
        if (err) throw err;
        if (!product) {
          next(new HttpError(404, "Product not found"));
          return;
        }
        Section.findOne({ _id: product.sections[0]}, function (err, section) {
          if (err) throw err;
          if (!section) {
            next(new HttpError(404, "Product main section not found"));
            return;
          }
          console.log(product);
          res.render('catalog/product', { sections: sections, product: product, section: section });
        });

      });
    });
  }
};