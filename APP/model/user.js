var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email : String,
    password : String,
    name : String,
    friend : [{
        type: Schema.ObjectId,
        ref: 'user'
    }],
    Msent:[{
        type: Schema.ObjectId,
        ref: 'mails'
    }],
    Mreceive:[{
        type: Schema.ObjectId,
        ref: 'mails'
    }],
});

// the schema is useless so far
// we need to create a model using it
var user = mongoose.model('user', userSchema);

// make this available to our users in our Node applications
module.exports = user;