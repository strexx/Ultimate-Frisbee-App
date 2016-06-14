var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    request = require('request'),
    session = require('express-session'),
    dateFormat = require('dateformat');


router.get('/', function (req, res, next) {
    var matchesArray = [],
        newMatchesArray = [],
        recentArray = [],
        liveArray = [],
        upcomingArray = [];

    global.session = req.session;

    var findMatches = function (db, callback) {
        var collectionCursor = db.collection('matches').find();
        collectionCursor.each(function (err, match) {
            if (match != null) {
                matchesArray.push(match);
            } else {
                callback();
            }
        });
    };

    findMatches(db, function () {
        var liveTime = "12:30",
            session = req.session.user_id;

        // Filter on time
        var recentMatches = matchesArray.filter(function (obj) {
            return obj.start_time < liveTime;
        });
        var liveMatches = matchesArray.filter(function (obj) {
            return obj.start_time == liveTime;
        });
        var upcomingMatches = matchesArray.filter(function (obj) {
            return obj.start_time > liveTime;
        });

        // Filter on recent matches
        var recentWomen = recentMatches.filter(function(obj) {
            return obj.tournament_id == "20058";
        });

        var recentMixed = recentMatches.filter(function(obj) {
            return obj.tournament_id == "20059";
        });

        var recentOpen = recentMatches.filter(function(obj) {
            return obj.tournament_id == "20060";
        });

        // Filter on live matches
        var liveWomen = liveMatches.filter(function(obj) {
            return obj.tournament_id == "20058";
        });

        var liveMixed = liveMatches.filter(function(obj) {
            return obj.tournament_id == "20059";
        });

        var liveOpen = liveMatches.filter(function(obj) {
            return obj.tournament_id == "20060";
        });

        // Filter on upcoming matches
        var upcomingWomen = upcomingMatches.filter(function(obj) {
            return obj.tournament_id == "20058";
        });

        var upcomingMixed = upcomingMatches.filter(function(obj) {
            return obj.tournament_id == "20059";
        });

        var upcomingOpen = upcomingMatches.filter(function(obj) {
            return obj.tournament_id == "20060";
        });

        // push objects in new array
        newMatchesArray.push({"liveWomen": liveWomen}, {"liveMixed": liveMixed}, {"liveOpen": liveOpen}, {"recentWomen": recentWomen}, {"recentMixed": recentMixed}, {"recentOpen": recentOpen}, {"upcomingWomen": upcomingWomen}, {"upcomingMixed": upcomingMixed}, {"upcomingOpen": upcomingOpen});

        console.log(newMatchesArray);

        res.render('matches', {
            title: 'Matches',
            items: newMatchesArray,
            user: session
        });
    });
});

router.get('/match/:gameID', function (req, res) {

    var gameID = req.params.gameID,
        session = req.session.user_id;

    request({
        url: 'https://api.leaguevine.com/v1/games/' + gameID + '/?access_token=3aa4afb621',
        json: true
    }, function (error, response, data) {
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

router.get('/tournaments', function (req, res) {
    var session = req.session.user_id;
    request({
        url: 'https://api.leaguevine.com/v1/tournaments/?tournament_ids=%5B19753%2C19751%2C19752%5D&access_token=bbe603bb50',
        json: true
    }, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            var objects = data.objects;
            res.render('tournaments', {
                title: 'Tournaments',
                items: objects,
                user: session
            });
        }
    });
});

router.get('/tournament/:tournamentID', function (req, res) {
    var tournamentID = req.params.tournamentID,
        session = req.session.user_id;
    request({
        url: 'https://api.leaguevine.com/v1/games/?tournament_id=' + tournamentID + '&order_by=%5Bstart_time%5D&limit=100&access_token=6dc9d3795a',
        json: true
    }, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            var objects = data.objects;

            for (var key in objects) {
                objects[key].start_time = dateFormat(objects[key].start_time, "HH:MM");
                if (objects[key].game_site !== null) {
                    objects[key].game_site.name = objects[key].game_site.name.split('.')[0];
                }
            }
            res.render('tournament', {
                title: 'Tournament',
                items: objects,
                user: session
            });
        } else {
            res.render('error', {
                title: 'Error',
                error: error
            });
            console.log(error);
        }
    });
});

router.get('/login', function (req, res) {
    res.render('login', {
        title: 'Login'
    });
});

router.get('/logout', function (req, res) {
    delete req.session.user_id;
    res.redirect('/login');
});

module.exports = router;
