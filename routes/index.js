var express = require('express'),
    router = express.Router(),
    fs = require('fs');

router.get('/', function (req, res, next) {
    res.render('loadscreen', { title: 'feed' });
});

module.exports = router;
