var util = require('util');

var mongoose = require('lib/mongoose'),
  Schema = mongoose.Schema;

var sectionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    'default': ''
  }
});

sectionSchema.methods.checkUrl = function (url) {
  return this.url == url.replace(/[^A-Za-zА-Яа-яЁё]/g, "");
};

module.exports = mongoose.model('Section', sectionSchema);