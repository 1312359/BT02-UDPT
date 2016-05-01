var express = require('express');
var router = express.Router();
var user = require('../model/user');
router.get('/', function(req, res) {
    res.render('user', { title: 'user' });
});

module.exports = router;