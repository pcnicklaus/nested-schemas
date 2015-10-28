var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema ({
  name: String,
  dogs: [{type: Schema.Types.ObjectId, ref: 'dogs'}]
});

module.exports = mongoose.model('users', User);
