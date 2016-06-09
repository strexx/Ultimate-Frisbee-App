var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    request = require('request'),
    dateFormat = require('dateformat'),
    mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    url = 'mongodb://146.185.135.172:27017/ultifris';


router.get('/', function(req, res, next) {
    var matchArray = [];


    // var bla = [{
    //     "object1": [ // 10:30
    //         {}, {}, {}
    //     ],
    //     "object2": [ // 12:30
    //         {}, {}, {}
    //     ],
    //     "object3": [ // 14:30 & 18:30
    //         {}, {}, {}
    //     ]
    // }];

    //console.log(recentMatches);

    // var liveMatches = matchArray.map(function(obj) {
    //     var newObj = {};
    //     newObj[obj.key] = obj.value;
    //     return newObj;
    // });
    //
    // var upcomingMatches = matchArray.map(function(obj) {
    //     var newObj = {};
    //     newObj[obj.key] = obj.value;
    //     return newObj;
    // });

    var findMatches = function(db, callback) {
        var collectionCursor = db.collection('matches').find();
        collectionCursor.each(function(err, match) {
            if (match != null) {
              matchArray.push(match);
              //console.log(match);

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
                    var recentTime = "10:00";
                    var liveTime = "12:30";
                    //var upcomingTime = "14:30";

                    var recentMatches = matchArray.filter(function(obj) {
                        return obj.start_time < liveTime;
                    });
                    var liveMatches = matchArray.filter(function(obj) {
                        return obj.start_time == liveTime;
                    });
                    var upcomingMatches = matchArray.filter(function(obj) {
                        return obj.start_time > liveTime;
                    });

                    //console.log(recentMatches);

                    res.render('matches', {
                      title: 'Matches',
                      items: liveMatches,
                      recentMatches: recentMatches,
                      liveMatches: liveMatches,
                      upcomingMatches: upcomingMatches

                    });
                    db.close();
                })
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
