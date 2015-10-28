var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dogs = new Schema ({
  name: String,
  breed: String,
  age: Number
});

module.exports = mongoose.model('dogs', Dog);
