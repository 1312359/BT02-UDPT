var express = require('express');
var router = express.Router();
var User = require('../model/user');
var Mail = require('../model/mails');
var mongoose = require('mongoose');

//function renderPage( remark, req, res){
//var mailList = [];
//User.findOne({email : req.user.email},function(err, user){
//  user.Mreceive.forEach(function(mail){
//      mailList.push({"name" : mail.name, "message": mail.message});
//  })
// res.render('index', {
//   title: 'index',
//    user: req.user,
//    isAuthenticated:req.isAuthenticated(),
//     remark: remark,
//     mailList : mailList
//  });
// }).populate('mail');
//}

//router.get('/',function(remark,req,res){
//renderPage('index',{
// isAuthenticated:req.isAuthenticated(),
//user:req.user,
// mailList : mailList

// });
// function renderPage( remark, req, res){
router.get('/sentmail',function(req,res) {
        function renderPage( remark, req, res){
            var mailList = [];
            User.findOne({email : req.user.email},function(err, user){
                user.Msent.forEach(function(mail){
                    mailList.push({"name" : mail.name, "message": mail.message,"sender":mail.sender});
                })
                res.render('sentmail', {
                    title: 'sentmail',
                    user: req.user,
                    isAuthenticated:req.isAuthenticated(),
                    remark: remark,
                    mailList : mailList
                });
            }).populate('Msent');
        }
        renderPage("",req,res);



});
module.exports = router;