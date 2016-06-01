var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    request = require('request'),
    dateFormat = require('dateformat');

router.get('/matches/live', function (req, res, next) {
    request({url: 'https://api.leaguevine.com/v1/games/?tournament_id=19746&starts_after=2015-06-12T11%3A00%3A00%2B02%3A00&order_by=%5Bstart_time%5D&limit=20&access_token=6dc9d3795a', json: true}, function (error, response, data) {
        if (!error && response.statusCode == 200) {
          var objects = data.objects;

          for(var key in objects) {
            objects[key].start_time = dateFormat(objects[key].start_time, "h:MM TT");
            objects[key].game_site.name = objects[key].game_site.name.split('.')[0];
          }
          res.render('matches', { title: 'Matches', items: objects, layout: false });
        }
    });
});

router.get('/matches/recent', function (req, res, next) {
    request({url: 'https://api.leaguevine.com/v1/games/?tournament_id=19746&starts_before=2015-06-12T11%3A00%3A00%2B02%3A00&order_by=%5B-start_time%5D&limit=20&access_token=6dc9d3795a', json: true}, function (error, response, data) {
        if (!error && response.statusCode == 200) {
          var objects = data.objects;

          for(var key in objects) {
            objects[key].start_time = dateFormat(objects[key].start_time, "h:MM TT");
            objects[key].game_site.name = objects[key].game_site.name.split('.')[0];
          }
          res.render('matches', { title: 'Matches', items: objects, layout: false });
        }
    });
});

router.get('/matches/upcoming', function (req, res, next) {
    request({url: 'https://api.leaguevine.com/v1/games/?tournament_id=19746&starts_after=2015-06-12T14%3A00%3A00%2B02%3A00&order_by=%5Bstart_time%5D&limit=20&access_token=6dc9d3795a', json: true}, function (error, response, data) {
        if (!error && response.statusCode == 200) {
          var objects = data.objects;

          for(var key in objects) {
            objects[key].start_time = dateFormat(objects[key].start_time, "h:MM TT");
            objects[key].game_site.name = objects[key].game_site.name.split('.')[0];
          }
          res.render('matches', { title: 'Matches', items: objects, layout: false });
        }
    });
});

router.get('/tournaments', function (req, res, next) {
    request({url: 'https://api.leaguevine.com/v1/tournaments/?tournament_ids=%5B19753%2C19751%2C19752%5D&access_token=bbe603bb50', json: true}, function (error, response, data) {
        if (!error && response.statusCode == 200) {
          var objects = data.objects;
          console.log(objects);
          res.render('tournaments', { title: 'Tournaments', items: objects, layout: false });
        }
    });
});


module.exports = router;
