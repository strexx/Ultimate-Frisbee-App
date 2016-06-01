var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');

router.get('/matches/live', function (req, res, next) {
<<<<<<< HEAD
    request({url: 'https://api.leaguevine.com/v1/games/?sport=ultimate&limit=20&tournament_id=20059&access_token=bcfb4d45e5', json: true}, function (error, response, data) {
=======
    request({url: 'https://api.leaguevine.com/v1/games/?tournament_id=19746&starts_after=2015-06-12T11%3A00%3A00%2B02%3A00&order_by=%5Bstart_time%5D&limit=20&access_token=6dc9d3795a', json: true}, function (error, response, data) {
>>>>>>> master
        if (!error && response.statusCode == 200) {
          console.log(data);
          res.render('matches', { title: 'Matches', items: data.objects, layout: false });
        }
    });
});

router.get('/matches/recent', function (req, res, next) {
<<<<<<< HEAD
    request({url: 'https://api.leaguevine.com/v1/games/?sport=ultimate&limit=20&tournament_id=20059&access_token=bcfb4d45e5', json: true}, function (error, response, data) {
=======
    request({url: 'https://api.leaguevine.com/v1/games/?tournament_id=19746&starts_before=2015-06-12T11%3A00%3A00%2B02%3A00&order_by=%5B-start_time%5D&limit=20&access_token=6dc9d3795a', json: true}, function (error, response, data) {
>>>>>>> master
        if (!error && response.statusCode == 200) {
          console.log(data);
          res.render('matches', { title: 'Matches', items: data.objects, layout: false });
        }
    });
});

router.get('/matches/upcoming', function (req, res, next) {
<<<<<<< HEAD
    request({url: 'https://api.leaguevine.com/v1/games/?sport=ultimate&limit=20&tournament_id=20059&access_token=bcfb4d45e5', json: true}, function (error, response, data) {
=======
    request({url: 'https://api.leaguevine.com/v1/games/?tournament_id=19746&starts_after=2015-06-12T14%3A00%3A00%2B02%3A00&order_by=%5Bstart_time%5D&limit=20&access_token=6dc9d3795a', json: true}, function (error, response, data) {
>>>>>>> master
        if (!error && response.statusCode == 200) {
          console.log(data);
          res.render('matches', { title: 'Matches', items: data.objects, layout: false });
        }
    });
});

module.exports = router;
