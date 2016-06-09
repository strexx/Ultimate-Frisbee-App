var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    request = require('request'),
    dateFormat = require('dateformat'),
    mongodb = require('mongodb'),
    //ObjectId = require('mongodb').ObjectID,
    MongoClient = mongodb.MongoClient,
    //assert = require('assert'),
    url = 'mongodb://146.185.135.172:27017/ultifris';



router.get('/', function(req, res, next) {
    var matchArray = [];

    var findMatches = function(db, callback) {
        var collectionCursor = db.collection('matches').find();
        collectionCursor.each(function(err, match) {
            if (match != null) {
              matchArray.push(match);
              console.log(match);

            } else {
              callback();
            }
        });
    };



    MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                console.log('Connection established!');

                findMatches(db, function() {
                    // console.log(match);
                    res.render('matches', {
                      title: 'Matches',
                      items: matchArray
                    });
                    // console.log('matches were found');
                    db.close();
                })
            }
          });

        request({url: 'https://api.leaguevine.com/v1/games/?tournament_id=19746&starts_after=2015-06-12T11%3A00%3A00%2B02%3A00&order_by=%5Bstart_time%5D&limit=6&access_token=6dc9d3795a', json: true, timeout: 6000}, function (error, response, data) {
              if (!error && response.statusCode == 200) {
                var objects = data.objects;

                for(var key in objects) {
                  objects[key].start_time = dateFormat(objects[key].start_time, "HH:MM");
                  objects[key].game_site.name = objects[key].game_site.name.split('.')[0];
                }
                res.render('matches', { title: 'Matches', items: objects });
              } else {
                res.render('error', { title: 'Error', error: error });
                console.log(error);
              }
          });
});

router.get('/match/:gameID', function(req, res, next) {
    var gameID = req.params.gameID,
        session = req.session.user_id;

    console.log(session);

    request({
        url: 'https://api.leaguevine.com/v1/games/' + gameID + '/?access_token=3aa4afb621',
        json: true
    }, function(error, response, data) {
        if (!error && response.statusCode == 200) {
            var objects = data;

            objects.start_time = dateFormat(objects.start_time, "HH:MM");
            objects.game_site.name = objects.game_site.name.split('.')[0];

            res.render('match', {
                title: 'Match',
                items: objects,
                user: session
            });
        }
    });
});

router.get('/tournaments', function(req, res, next) {
    request({
        url: 'https://api.leaguevine.com/v1/tournaments/?tournament_ids=%5B19753%2C19751%2C19752%5D&access_token=bbe603bb50',
        json: true
    }, function(error, response, data) {
        if (!error && response.statusCode == 200) {
            var objects = data.objects;
            console.log(objects);
            res.render('tournaments', {
                title: 'Tournaments',
                items: objects
            });
        }
    });
});

router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Login'
    });
});

router.get('/logout', function(req, res) {
    delete req.session.user_id;
    res.redirect('/login');
});

module.exports = router;
