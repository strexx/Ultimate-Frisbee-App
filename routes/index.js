var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    request = require('request'),
    session = require('express-session'),
    dateFormat = require('dateformat');


router.get('/', function (req, res, next) {
    var matches = [],
        matchesToday = []
        matchesfinal = [];

    var session = req.session;

    console.log(session);

    var findMatches = function (db, callback) {
        var collectionCursor = db.collection('matches').find();
        collectionCursor.each(function (err, match) {
            if (match != null) {
                matches.push(match);
            } else {
                callback();
            }
        });
    };

    findMatches(db, function () {
        var liveTime = "12:30",
            todayDate = "03-06-2016"
            session = req.session.user_id;

        // Filter on today's date
        var matchesToday = matches.filter(function (obj) {
            var currentDate = obj.start_time.split(" ")[0];
            return currentDate == todayDate;
        });

        for (var key in matchesToday) {
            if(matchesToday[key].start_time !== undefined){
                matchesToday[key].start_time = matchesToday[key].start_time.split(" ")[1];
            }
            //console.log(matchesToday[key].start_time);
        }


        // Filter on time
        var recentMatches = matchesToday.filter(function (obj) {
            return obj.start_time < liveTime;
        });
        var liveMatches = matchesToday.filter(function (obj) {
            return obj.start_time == liveTime;
        });
        var upcomingMatches = matchesToday.filter(function (obj) {
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
        matchesfinal.push({
            "liveWomen": liveWomen
        }, {
            "liveMixed": liveMixed
        }, {
            "liveOpen": liveOpen
        }, {
            "recentWomen": recentWomen
        }, {
            "recentMixed": recentMixed
        }, {
            "recentOpen": recentOpen
        }, {
            "upcomingWomen": upcomingWomen
        }, {
            "upcomingMixed": upcomingMixed
        }, {
            "upcomingOpen": upcomingOpen
        });

        //console.log(newMatchesArray);

        res.render('matches', {
            title: 'Matches',
            items: matchesfinal,
            user: session
        });
    });
});

router.get('/match/:gameID', function(req, res) {
    var gameID = parseInt(req.params.gameID),
        session = req.session.user_id,
        matchObject;

    var findMatches = function(db, callback) {
        var collectionCursor = db.collection('matches').find({
            id: gameID
        });
        collectionCursor.each(function(err, match) {
            if (match != null) {
                matchObject = match;
            } else {
                callback();
            }
        });
    };

    findMatches(db, function() {
        res.render('match', {
            title: 'Match',
            items: matchObject,
            user: session
        });
    });
});

router.get('/tournaments', function (req, res) {
    var tournamentIDs = [],
        tournamentNames = [],
        tournamentsArray = [],
        session = req.session.user_id;

    Array.prototype.contains = function(v) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] === v) return true;
        }
        return false;
    };

    Array.prototype.unique = function() {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (!arr.contains(this[i])) {
                arr.push(this[i]);
            }
        }
        return arr;
    };

    var findTournaments = function(db, callback) {
        var collectionCursor = db.collection('matches').find();

        collectionCursor.each(function(err, match) {
            if (match !== null) {
                var tournament = match.tournament;
                var tournamentID = tournament.id;
                var tournamentName = tournament.name;

                tournamentIDs.push(tournamentID);
                tournamentNames.push(tournamentName);
            } else {
                callback();
            }
        });
    };


    findTournaments(db, function() {
        var newTournamentIDs = tournamentIDs.unique();
        var newTournamentNames = tournamentNames.unique();

        newTournamentIDs.forEach(function(item, i){
            var tournamentObj = { id: newTournamentIDs[i], name: newTournamentNames[i] };
            tournamentsArray.push(tournamentObj);
        });

        res.render('tournaments', {
            title: 'Tournaments',
            items: tournamentsArray,
            user: session
        });
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
