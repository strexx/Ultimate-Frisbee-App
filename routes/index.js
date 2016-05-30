var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res, next) {
    res.render('main', { title: 'main' });
});

module.exports = router;
