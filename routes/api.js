var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');

router.get('/matches/live', function (req, res, next) {
    request({url: 'https://api.leaguevine.com/v1/games/?sport=ultimate&limit=20&tournament_id=20059&access_token=bcfb4d45e5', json: true}, function (error, response, data) {
        if (!error && response.statusCode == 200) {
          console.log(data);
          res.render('matches', { title: 'Matches', items: data.objects, layout: false });
        }
    });
});

router.get('/matches/recent', function (req, res, next) {
    request({url: 'https://api.leaguevine.com/v1/games/?sport=ultimate&limit=20&tournament_id=20059&access_token=bcfb4d45e5', json: true}, function (error, response, data) {
        if (!error && response.statusCode == 200) {
          console.log(data);
          res.render('matches', { title: 'Matches', items: data.objects, layout: false });
        }
    });
});

router.get('/matches/upcoming', function (req, res, next) {
    request({url: 'https://api.leaguevine.com/v1/games/?sport=ultimate&limit=20&tournament_id=20059&access_token=bcfb4d45e5', json: true}, function (error, response, data) {
        if (!error && response.statusCode == 200) {
          console.log(data);
          res.render('matches', { title: 'Matches', items: data.objects, layout: false });
        }
    });
});

module.exports = router;
