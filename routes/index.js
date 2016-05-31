var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');

router.get('/', function (req, res, next) {
    request({url: 'https://api.leaguevine.com/v1/games/?tournament_id=20059&starts_after=2016-06-04T15%3A00%3A00%2B02%3A00&order_by=%5Bstart_time%5D&limit=20&access_token=6dc9d3795a', json: true}, function (error, response, data) {
        if (!error && response.statusCode == 200) {
          console.log(data);
          res.render('matches', { title: 'Matches', items: data.objects });
        }
    });
});

module.exports = router;
