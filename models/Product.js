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
      ref: 'Section',
      required: true
    }
  ],
  type: { type: String, 'default': '' },
  description: { type: String, 'default': '' },
  nomination_title: { type: String, 'default': '' },
  nominations: [{ type: String, 'default': '' }],
  categories: [{ type: String, 'default': '' }],
  users: [{ type: String, 'default': '' }]
});

productSchema.methods.checkUrl = function (url) {
  return this.url == url.replace(/[^A-Za-zА-Яа-яЁё]/g, "");
};

module.exports = mongoose.model('Product', productSchema);