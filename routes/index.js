var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    request = require('request'),
    session = require('express-session'),
    dateFormat = require('dateformat'),
    bla = require('../modules/unique.js')();


router.get('/', function (req, res, next) {
    var matches = [],
        matchesToday = [],
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
            todayDate = "03-06-2016",
            session = req.session.user_id;

        // Filter on today's date
        var matchesToday = matches.filter(function (obj) {
            var currentDate = obj.start_time.split(" ")[0];
            return currentDate == todayDate;
        });

        for (var key in matchesToday) {
            if (matchesToday[key].start_time !== undefined){
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

    var findTournaments = function (db, callback) {
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

		console.log(tournamentsArray);


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
        tournamentMatchesFinal = [],
        tournamentDates = [],
        tournamentRounds = [],
        tournamentRanking = [];

    var findTournamentMatches = function(db, callback) {
        var collectionCursor = db.collection('matches').find({
            "tournament.id": tournamentID
        });
        collectionCursor.each(function(err, match) {
            if (match != null) {
                if (match.start_time !== undefined){
                    var tournamentDate = match.start_time.split(" ")[0]
                    tournamentDates.push(tournamentDate);
                }
                tournamentMatches.push(match);
            } else {
                callback();
            }
        });
    };


    var findTournamentRounds = function (db, callback) {
		var collectionCursor = db.collection('rounds').find();

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


    // var findTournamentRanking = function (db, callback) {
    //     var collectionCursor = db.collection('matches').find();
    //
    //     collectionCursor.each(function(err, match) {
    //         if (match !== null) {
    //             var tournament = match.tournament;
    //             var tournamentID = tournament.id;
    //             var tournamentName = tournament.name;
    //
    //             tournamentIDs.push(tournamentID);
    //             tournamentNames.push(tournamentName);
    //         } else {
    //             callback();
    //         }
    //     });
    // };


    findTournamentRounds(db, function() {
        var session = req.session.user_id;

        // Get all days from tournament
        var tournamentDays = tournamentDates.unique();

        for (var key in tournamentMatches) {
            if (tournamentMatches[key].start_time !== undefined && tournamentMatches[key].start_time !== null){
                tournamentMatches[key].start_date = tournamentMatches[key].start_time.split(" ")[0];
                tournamentMatches[key].start_time = tournamentMatches[key].start_time.split(" ")[1];
            }
        }

        var tournamentDayOne = tournamentMatches.filter(function(obj) {
            var tournamentDay = obj.start_date;
            return tournamentDay == tournamentDays[0];
        });

        var tournamentDayTwo = tournamentMatches.filter(function(obj) {
            var tournamentDay = obj.start_date;
            return tournamentDay == tournamentDays[1];
        });

        var tournamentDayThree = tournamentMatches.filter(function(obj) {
            var tournamentDay = obj.start_date;
            return tournamentDay == tournamentDays[2];
        });

        console.log(tournamentDayOne);

        tournamentMatchesFinal.push({
            "dayOne": tournamentDayOne
        }, {
            "dayTwo": tournamentDayTwo
        }, {
            "dayThree": tournamentDayThree
        });
    });


    findTournamentMatches(db, function() {
        var session = req.session.user_id;

        // Get all days from tournament
        var tournamentDays = tournamentDates.unique();

        for (var key in tournamentMatches) {
            if (tournamentMatches[key].start_time !== undefined && tournamentMatches[key].start_time !== null){
                tournamentMatches[key].start_date = tournamentMatches[key].start_time.split(" ")[0];
                tournamentMatches[key].start_time = tournamentMatches[key].start_time.split(" ")[1];
            }
        }

        var tournamentDayOne = tournamentMatches.filter(function(obj) {
            var tournamentDay = obj.start_date;
            return tournamentDay == tournamentDays[0];
        });

        var tournamentDayTwo = tournamentMatches.filter(function(obj) {
            var tournamentDay = obj.start_date;
            return tournamentDay == tournamentDays[1];
        });

        var tournamentDayThree = tournamentMatches.filter(function(obj) {
            var tournamentDay = obj.start_date;
            return tournamentDay == tournamentDays[2];
        });

        //console.log(tournamentDayOne);

        tournamentMatchesFinal.push({
            "dayOne": tournamentDayOne
        }, {
            "dayTwo": tournamentDayTwo
        }, {
            "dayThree": tournamentDayThree
        });

		res.render('tournament', {
			title: 'Tournament',
			items: tournamentMatchesFinal,
			//ranking: ranking,
			//schedule: schedule,
			user: session
		});
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
