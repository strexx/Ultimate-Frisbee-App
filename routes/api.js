var express = require('express'),
    router = express.Router(),
    request = require('request'),
    dateFormat = require('dateformat'),
    session = require('express-session'),
    mongodb = require('mongodb'),
    //ObjectId = require('mongodb').ObjectID,
    MongoClient = mongodb.MongoClient,
    //assert = require('assert'),
    url = 'mongodb://146.185.135.172:27017/ultifris',
    passwordHash = require('password-hash');

router.get('/matches', function(req, res) {
    request({
        url: 'https://api.leaguevine.com/v1/games/?tournament_id=20058&starts_after=2015-06-12T11%3A00%3A00%2B02%3A00&order_by=%5Bstart_time%5D&limit=5&access_token=6dc9d3795a',
        json: true
    }, function(error, response, data) {
        if (!error && response.statusCode == 200) {
            var objects = data.objects;

            for (var key in objects) {
                objects[key].start_time = dateFormat(objects[key].start_time, "HH:MM");
                objects[key].game_site.name = objects[key].game_site.name.split('.')[0];
            }
            res.render('matches', {
                title: 'Matches',
                items: objects,
                layout: false
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
                items: objects,
                layout: false
            });
        }
    });
});

router.get('/match/:gameID', function(req, res) {
    var gameID = req.params.gameID,
        session = req.session.user_id;

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
                scorekeeperIsLoggedIn: session
            });
        }
    });
});

router.post('/login', function(req, res) {

    var post = req.body,
        email, password;

    var session = req.session;

    if (post) {
        email = req.body.email,
            password = req.body.password;
    } else {
        console.log("Error when posting data");
    }

    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established!');
            var collection = db.collection('accounts');
            collection.findOne({
                email: email
            }, function(err, account) {
                if (err) throw err;
                if (account) {
                    if (passwordHash.verify(password, account.password)) {
                        req.session.user_id = account._id;
                        console.log("username" + email + " hashedPassword: " + account.password + " user_id " + req.session.user_id);
                        res.redirect('/');
                    } else {
                        console.log(password + " is not matching with hash in database for user" + email);
                        res.redirect('/login-error?error=1');
                    }
                } else {
                    console.log(email + " not found in database");
                    res.redirect('/login-error?error=2');
                }
                db.close();
                console.log('Connection closed!');
            });
        }
    });

});

router.post('/match/score', function(req, res) {

    var post = req.body;

    if (post) {

      console.log(post);

      var score1 = parseInt(post.score_team_1),
          score2 = parseInt(post.score_team_2),
          gameID = parseInt(post.gameID),
          isFinal = false,
          user_id = null;

      if (post.isFinal)
        isFinal = true;

      if (post.user_id)
        user_id = post.user_id;

      var postData = JSON.stringify({
          game_id: parseInt(gameID),
          team_1_score: score1,
          team_2_score: score2,
          is_final: isFinal,
          user_id: user_id
      });

    } else {
        console.log("Error when posting data");
    }

    var updateMatch = function(db, callback) {
        var matchesCollection = db.collection('matches');
        matchesCollection.updateOne({
                id: gameID
            }, {
                $set: {
                    team_1_score: score1,
                    team_2_score: score2
                }
            },
            function(err, results) {
                if (err) {
                    console.log(err);
                } else {
                    callback();
                }
            });
    };

    updateMatch(db, function() {
        // Log if match is updated in database
        console.log("Match " + gameID + " updated.. new scores are " + score1 + " and " + score2);

        //If scorekeeper is logged in and score is final score > post to API
        if (user_id && isFinal == true) {

            // Post url and headers
            var url = "https://api.leaguevine.com/v1/game_scores/",
                headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'bearer 40e50065ad'
                };

            // Post request
            request.post({
                url: url,
                body: postData,
                headers: headers
            }, function(req, res, body) {
                console.log("Scorekeeper " + user_id + " added new score");
            });

        } else {
            console.log("Regular user added new score");
            res.redirect('/match/' + gameID);
        }
    });
});

module.exports = router;
