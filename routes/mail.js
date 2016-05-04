var express = require('express');
var router = express.Router();
var User = require('../model/user');
var Mail = require('../model/mails')
var mongoose = require('mongoose');

router.get('/mail', function(req, res) {
    res.render('mail', { title: 'mail' });

});

router.post('/mail', function(req,res) {

    var NewMail = new Mail({
        name : req.body.name,
        message : req.body.message,
        sender :req.user.email
    });
    NewMail.save();
        if(!req.body.email){

            renderPage("need your friend's email !try again!", req, res);
        }
        else {

                    Mail.findOne({name : req.body.name},function(err,mail){
                        User.update({email : req.body.email},{$push : {"Mreceive" :{"_id" : mail._id}}},function(err, user){
                            //renderPage( "", req, res);
                        });
                    }).populate('Mreceive');


                    }
    Mail.findOne({name : req.body.name},function(err,mail){
        User.update({email : req.user.email},{$push : {"Msent" :{"_id" : mail._id}}},function(err, user){
            res.render('mail', { title: 'mail' });
        });
    }).populate('Msent');
});







module.exports = router;