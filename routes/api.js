var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/scores', function(req, res, next) {
    fs.readFile('https://api.leaguevine.com/v1/games/?tournament_id=20059&starts_after=2016-06-04T15%3A00%3A00%2B02%3A00&order_by=%5Bstart_time%5D&limit=20&access_token=6dc9d3795a', 'utf8', function(err, data) {
        if(err) {
            res.status(404);
            next();
        }

        console.log(data);

        res.render('matches', { title: 'Feed', items: JSON.parse(data), layout: false });
    });
});

module.exports = router;
