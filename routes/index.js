var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    request = require('request'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    dateFormat = require('dateformat'),
    unqiueKeys = require('../modules/uniqueKeys.js')(),
    formatDigits = require('../modules/formatDigits.js');

router.get('/', function(req, res, next) {
    var matches = [],
        matchesToday = [],
        matchesfinal = [];

    var session = req.session;

    console.log(session);

    var findMatches = function(db, callback) {
        var collectionCursor = db.collection('matches').find();
        collectionCursor.each(function(err, match) {
            if (match != null) {
                matches.push(match);
            } else {
                callback();
            }
        });
    };

    findMatches(db, function() {

        // var now = dateFormat(Date.now(), "HH:MM");
        // var liveTime = String(now);

        var liveTime = "12:30",
            todayDate = "03-06-2016",
            session = req.session.user_id;

        //Filter on today's date
        var matchesToday = matches.filter(function(obj) {
            var currentDate = obj.start_time.split(" ")[0];
            return currentDate == todayDate;
        });

        for (var key in matchesToday) {
            if (matchesToday[key].start_time !== undefined) {
                matchesToday[key].start_time = matchesToday[key].start_time.split(" ")[1];
            }
        }

        // Filter on time
        var recentMatches = matchesToday.filter(function(obj) {
            return obj.start_time < liveTime;
        });
        var liveMatches = matchesToday.filter(function(obj) {
            return obj.start_time == liveTime;
        });
        var upcomingMatches = matchesToday.filter(function(obj) {
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

        var recentCMD = recentMatches.filter(function(obj) {
            return obj.tournament_id == "20297";
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

        var liveCMD = liveMatches.filter(function(obj) {
            return obj.tournament_id == "20297";
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

        var upcomingCMD = upcomingMatches.filter(function(obj) {
            return obj.tournament_id == "20297";
        });


        // push objects in new array
        matchesfinal.push({
            "liveCMD": liveCMD
        }, {
            "liveWomen": liveWomen
        }, {
            "liveMixed": liveMixed
        }, {
            "liveOpen": liveOpen
        }, {
            "recentCMD": recentCMD
        }, {
            "recentWomen": recentWomen
        }, {
            "recentMixed": recentMixed
        }, {
            "recentOpen": recentOpen
        }, {
            "upcomingCMD": upcomingCMD
        }, {
            "upcomingWomen": upcomingWomen
        }, {
            "upcomingMixed": upcomingMixed
        }, {
            "upcomingOpen": upcomingOpen
        });

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
        matchObject,
        winner = null,
        feedbackMsg = req.query.message;

    var findMatches = function(db, callback) {
        var collectionCursor = db.collection('matches').find({
            id: gameID
        });
        collectionCursor.each(function(err, match) {
            if (match != null) {
                match.start_time = dateFormat(match.start_time, "HH:MM");
                matchObject = match;
                if (matchObject.winner_id)
                    winner = matchObject.winner_id;
            } else {
                callback();
            }
        });
    };

    findMatches(db, function() {
        res.render('match', {
            title: 'Match',
            items: matchObject,
            user: session,
            gameID: gameID,
            winner: winner,
            feedbackMsg: feedbackMsg
        });
    });

});

router.get('/tournaments', function(req, res) {
    var tournamentIDs = [],
        tournamentNames = [],
        tournamentsArray = [],
        session = req.session.user_id;

    var findTournaments = function(db, callback) {
        var collectionCursor = db.collection('matches').find();

        collectionCursor.each(function(err, match) {
            if (match !== null) {

                if (match.tournament !== null) {
                    var tournament = match.tournament;
                    var tournamentID = tournament.id;
                    var tournamentName = tournament.name;

                    tournamentIDs.push(tournamentID);
                    tournamentNames.push(tournamentName);
                }
            } else {
                callback();
            }
        });
    };

    findTournaments(db, function() {
        var newTournamentIDs = tournamentIDs.unique();
        var newTournamentNames = tournamentNames.unique();

        newTournamentIDs.forEach(function(item, i) {
            var tournamentObj = {
                id: newTournamentIDs[i],
                name: newTournamentNames[i]
            };
            tournamentsArray.push(tournamentObj);
        });

        res.render('tournaments', {
            title: 'Tournaments',
            items: tournamentsArray,
            user: session
        });

    });
});

router.get('/tournament/:tournamentID', function(req, res) {
    var tournamentID = parseInt(req.params.tournamentID),
        session = req.session.user_id;

    var tournamentMatches = [],
        tournamentMatchesArray = [],
        tournamentRounds = [],
        tournamentRoundsArray = [],
        tournamentRanking = [],
        tournamentRankingArray = [],
        tournamentDates = [];

    var findTournamentMatches = function(db, callback) {
        var collectionCursor = db.collection('matches').find({
            "tournament.id": tournamentID
        });
        collectionCursor.each(function(err, match) {
            if (match !== null) {
                if (match.start_time !== undefined) {
                    var tournamentDate = match.start_time.split(" ")[0]
                    tournamentDates.push(tournamentDate);
                }
                tournamentMatchesArray.push(match);
            } else {
                callback();
            }
        });
    };

    var findTournamentRounds = function(db, callback) {
        var collectionCursor = db.collection('tournaments').find();

        collectionCursor.each(function(err, rounds) {
            if (rounds !== null) {
                tournamentRoundsArray.push(rounds);
            } else {
                callback();
            }
        });
    };

    var findTournamentRanking = function(db, callback) {
        var collectionCursor = db.collection('tournaments').find();

        collectionCursor.each(function(err, ranking) {
            if (ranking !== null) {
                tournamentRankingArray.push(ranking);
            } else {
                callback();
            }
        });
    };

    // Tournament Matches callback
    findTournamentMatches(db, function() {
        // Get all days from tournament
        var tournamentDays = tournamentDates.unique();

        for (var key in tournamentMatchesArray) {
            if (tournamentMatchesArray[key].start_time !== undefined && tournamentMatchesArray[key].start_time !== null) {
                tournamentMatchesArray[key].start_date = tournamentMatchesArray[key].start_time.split(" ")[0];
                tournamentMatchesArray[key].start_time = tournamentMatchesArray[key].start_time.split(" ")[1];
            }
        }

        var tournamentDayOne = tournamentMatchesArray.filter(function(obj) {
            var tournamentDay = obj.start_date;
            return tournamentDay == tournamentDays[0];
        });

        var tournamentDayTwo = tournamentMatchesArray.filter(function(obj) {
            var tournamentDay = obj.start_date;
            return tournamentDay == tournamentDays[1];
        });

        var tournamentDayThree = tournamentMatchesArray.filter(function(obj) {
            var tournamentDay = obj.start_date;
            return tournamentDay == tournamentDays[2];
        });

        tournamentMatches.push({
            "dayOne": tournamentDayOne
        }, {
            "dayTwo": tournamentDayTwo
        }, {
            "dayThree": tournamentDayThree
        });
    });

    // Tournament Ranking callback
    findTournamentRanking(db, function() {
        for (var key in tournamentRankingArray) {
            var rankingArray = tournamentRankingArray[key].standings;

            for (var anotherKey in rankingArray) {
                if (rankingArray[anotherKey].ranking !== undefined && rankingArray[anotherKey].ranking !== null) {
                    rankingArray[anotherKey].ranking = formatDigits(rankingArray[anotherKey].ranking);
                }
            }
        }

        tournamentRanking = tournamentRankingArray;
    });

    // Tournament Rounds callback
    findTournamentRounds(db, function() {
        //console.log(tournamentRoundsArray);

        for (var key in tournamentRoundsArray) {
            var gamesArray = tournamentRoundsArray[key].games;

            for (var anotherKey in gamesArray) {
                if (gamesArray[anotherKey].start_time !== undefined && gamesArray[anotherKey].start_time !== null) {
                    gamesArray[anotherKey].start_time = gamesArray[anotherKey].start_time.split(" ")[1];
                }
            }
        }

        tournamentRounds = tournamentRoundsArray;

        setTimeout(function() {
            res.render('tournament', {
                title: 'Tournament',
                matches: tournamentMatches,
                rounds: tournamentRounds,
                ranking: tournamentRanking,
                user: session
            });
        }, 1000);

    });
});

router.get('/login', function(req, res) {
    res.render('login', {
        title: 'Login'
    });
});

router.get('/login-error', function(req, res) {
    var errorType = parseInt(req.query.error),
        error;
    console.log(errorType);
    if (errorType == 1) {
        error = "Login failed. Password or e-mail incorrect.";
    } else if (errorType == 2) {
        error = "Login failed. User not found.";
    }
    res.render('login-error', {
        title: 'Login',
        error: error
    });
});

router.get('/logout', function(req, res) {
    delete req.session.user_id;
    res.redirect('/login');
});

router.get('/favorites', function(req, res, next) {

    // Empty arrays to assign matches from database
    var favMatches = [],
    favIDArray = [];

    // Check if there are favorites set
    if(req.cookies.matchID && req.cookies.matchID != '[]') {

      var favoritesCookie = JSON.parse(req.cookies.matchID);

      for (var i=0; i<favoritesCookie.length; i++) {
           favIDArray.push(parseInt(favoritesCookie[i]));
      }

      // Find matches with favorite ID's
      var findMatches = function(db, callback) {
              var collectionCursor = db.collection('matches').find({
                  id: {$in: favIDArray}
              });

              collectionCursor.each(function(err, match) {

                if (match != null) {
                    match.start_time = dateFormat(match.start_time, "HH:MM");
                    favMatches.push(match);
                } else {
                    callback();
                }
              });
      };

      // Render favorite matches
      findMatches(db, function() {
          res.render('favorites', {
              title: 'Favorites',
              items: favMatches
          });
      });

    } else {

      // Show message when no favorites are added
      var message = "No favorites added yet";

      res.render('favorites', {
          title: 'Favorites',
          message: message
      });
    }
});


module.exports = router;
