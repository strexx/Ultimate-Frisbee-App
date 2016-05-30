var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/update-score', function (req, res, next) {
    res.render('update-score', { title: 'updateScore' });
});

module.exports = router;
