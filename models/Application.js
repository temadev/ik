var util = require('util');

var mongoose = require('lib/mongoose'),
  Schema = mongoose.Schema;

var applicationSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  title: { type: String, 'default': '' },
  created: { type: Date, 'default': Date.now() },
  status: { type: String, 'default': '' },
  payment: { type: String, 'default': '' },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Application', applicationSchema);