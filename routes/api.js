var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/feed', function(req, res, next) {
    fs.readFile('https://api.leaguevine.com/v1/games/?tournament_id=20059&access_token=bcfb4d45e5', 'utf8', function(err, data) {
        if(err) {
            res.status(404);
            next();
        }

        res.render('feed', { title: 'Feed', items: JSON.parse(data), layout: false });
    });
});

module.exports = router;
