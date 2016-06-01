var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res, next) {
    res.render('loadscreen', { title: 'feed' });
});

module.exports = router;
