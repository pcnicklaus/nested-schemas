var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new User ({
  name: String,
  city: String,
  dogs: [{type: Schema.Types.ObjectId, ref: 'dogs'}]
});

module.exports = mongoose.model('users', User);
