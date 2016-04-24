var express = require('express');
var router = express.Router();
var user = require('../model/user');
var mongoose = require('mongoose');
router.get('/', function(req, res) {

    //mongoose.model('user').find(name : 'Phan', function(err,user){
    //    res.send(user);
    //});
    res.render('index');

});

module.exports = router;