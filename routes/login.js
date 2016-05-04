var express = require('express');
var router = express.Router();
var user = require('../model/user');

router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});

module.exports = router;