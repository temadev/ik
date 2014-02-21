var util = require('util');

var mongoose = require('lib/mongoose'),
  Schema = mongoose.Schema;

var productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    unique: true,
    required: true
  },
  price: {
    type: Number,
    'default': ''
  },
  promo: { type: Boolean },
  sections: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Card',
      required: true
    }
  ],
  description: { type: String, 'default': '' },
  start: { type: String, 'default': '' },
  end: { type: String, 'default': '' }
});

productSchema.methods.checkUrl = function (url) {
  return this.url == url.replace(/[^A-Za-zА-Яа-яЁё]/g, "");
};

module.exports = mongoose.model('Product', productSchema);