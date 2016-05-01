var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../model/user');

router.get('/register', function(req, res) {
    res.render('register', {
        title: 'Register',
        remark: ''
    });
});
router.post('/register', function(req,res) {

    var NewUser = new user({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });
    mongoose.model('user').find({email : req.body.email},function(err, user){
        if(user.length == 0) {
            if(!req.body.email || !req.body.password || !req.body.name){
                res.render('register', {
                    title: 'Register',
                    remark: 'still missing imformation'
                });
            }else {
                NewUser.save(function(err) {
                    if (err) throw err;
                });
                res.redirect('/');
            }

        }
        else {
            res.render('register', {
                title: 'Register',
                remark: 'Email already register'
            });
        };

    });

});
module.exports = router;