var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name : String,
    message : String,
    sender: String
});

// the schema is useless so far
// we need to create a model using it
var user = mongoose.model('mails', userSchema);

// make this available to our users in our Node applications
module.exports = user;