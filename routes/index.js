var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    request = require('request'),
    dateFormat = require('dateformat');


router.get('/', function(req, res, next) {
    var matchArray = [];

    var findMatches = function(db, callback) {
        var collectionCursor = db.collection('matches').find();
        collectionCursor.each(function(err, match) {
            if (match != null) {
                matchArray.push(match);

            } else {
                callback();
            }
        });
    };

    findMatches(db, function() {
        var liveTime = "12:30";
        //var recentTime = "10:00";
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

        res.render('matches', {
            title: 'Matches',
            items: liveMatches,
            recentMatches: recentMatches,
            liveMatches: liveMatches,
            upcomingMatches: upcomingMatches

        });
    });

});

router.get('/match/:gameID', function(req, res) {
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

router.get('/tournaments', function(req, res) {
    request({
        url: 'https://api.leaguevine.com/v1/tournaments/?tournament_ids=%5B19753%2C19751%2C19752%5D&access_token=bbe603bb50',
        json: true
    }, function(error, response, data) {
        if (!error && response.statusCode == 200) {
            var objects = data.objects;
            res.render('tournaments', {
                title: 'Tournaments',
                items: objects
            });
        }
    });
});

router.get('/tournament/:tournamentID', function(req, res) {
    var tournamentID = req.params.tournamentID;
    console.log(tournamentID);

    request({
        url: 'https://api.leaguevine.com/v1/games/?tournament_id=' + tournamentID + '&order_by=%5Bstart_time%5D&limit=100&access_token=6dc9d3795a',
        json: true
    }, function(error, response, data) {
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
                items: objects
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

router.get('/login', function(req, res) {
    res.render('login', {
        title: 'Login'
    });
});

router.get('/logout', function(req, res) {
    delete req.session.user_id;
    res.redirect('/login');
});

module.exports = router;
