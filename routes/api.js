var express = require('express'),
    router = express.Router(),
    request = require('request'),
    dateFormat = require('dateformat'),
    session = require('express-session'),
    matchesLogic = require('../modules/matches.js'),
    passwordHash = require('password-hash');


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

    // Database
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
    });

});

function updateMatches() {

    var urls = ["https://api.leaguevine.com/v1/games/?tournament_id=20058&order_by=%5Bstart_time%5D&limit=100&access_token=6dc9d3795a", "https://api.leaguevine.com/v1/games/?tournament_id=20059&order_by=%5Bstart_time%5D&limit=100&access_token=6dc9d3795a", "https://api.leaguevine.com/v1/games/?tournament_id=20060&order_by=%5Bstart_time%5D&limit=100&access_token=6dc9d3795a"];

    multiRequest(urls, function(responses) {

        var url,
            responses,
            objects = [];

        for (url in responses) {

            response = responses[url];

            // find errors
            if (response.error) {
                console.log("Error", url, response.error);
                return;
            }

            // render body
            if (response.body) {
                var parsedResponse = JSON.parse(response.body);
                var responsesObj = parsedResponse.objects; // [{x80}],

                for (var key in responsesObj) {
                    if (responsesObj[key].start_time !== undefined && responsesObj[key].start_time !== null) {
                        responsesObj[key].start_time = dateFormat(responsesObj[key].start_time, "dd-mm-yyyy HH:MM");
                    }
                    if (responsesObj[key].game_site !== undefined && responsesObj[key].game_site !== null) {
                        responsesObj[key].game_site.name = responsesObj[key].game_site.name.slice(0, 8);
                    }
                    objects.push(responsesObj[key]);
                }
            }
            //console.log(objects);
        }


        deleteMatches();
        addMatches(objects);
        console.log("database updated from api");
    });
}

function deleteMatches() {
    matchesCollection.drop(function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Removed documents from the "matches" collection.', result);
        }
    });
}

function addMatches(objects) {
    matchesCollection.insert(objects, {
        keepGoing: true,
        continueOnError: true
    }, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Inserted documents into the "objects" collection. The documents inserted with "_id" are:', result.length, result);
        }
    });
}

function updateMatchFromApi(gameID) {
  var object = [];
  request({url: 'https://api.leaguevine.com/v1/games/?game_ids=%5B' + gameID + '%5D&access_token=e9f0c8fd67'}, function (error, response, data) {
      if (!error && response.statusCode == 200) {

        var parsedResponse = JSON.parse(response.body);
        var responsesObj = parsedResponse.objects; // [{x80}],

        for (var key in responsesObj) {
            if (responsesObj[key].start_time !== undefined && responsesObj[key].start_time !== null) {
                responsesObj[key].start_time = dateFormat(responsesObj[key].start_time, "dd-mm-yyyy HH:MM");
            }
            if (responsesObj[key].game_site !== undefined && responsesObj[key].game_site !== null) {
                responsesObj[key].game_site.name = responsesObj[key].game_site.name.slice(0, 8);
            }
            object.push(responsesObj[key]);
        }

        deleteMatch(gameID);
        addMatch(object[0]);

      } else {
        console.log(error);
      }
 });
}

function deleteMatch(gameID) {
  var matchesCollection = db.collection('matches');
  matchesCollection.remove({id: gameID},
    function(err, result) {
      if (err) {
          console.log(err);
      } else {
          console.log('Deleted document into the "matches" collection. The document deleted with "_id" is:', result.length, result);
      }
  });
}

function addMatch(data) {
  var matchesCollection = db.collection('matches');
  matchesCollection.insertOne(data, function(err, result) {
      if (err) {
          console.log(err);
      } else {
          console.log('Inserted document into the "matches" collection. The document inserted with "_id" is:', result.length, result);
      }
  });
}

router.post('/match/score', function(req, res) {

    var post = req.body;

    if (post) {

        var score1 = parseInt(post.score_team_1),
            score2 = parseInt(post.score_team_2),
            gameID = parseInt(post.gameID),
            isFinal = false,
            userID = null;

        if (post.isFinal)
            isFinal = true;

        if (post.userID)
            userID = post.userID;

        var postData = JSON.stringify({
            game_id: parseInt(gameID),
            team_1_score: score1,
            team_2_score: score2,
            is_final: isFinal
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
        if (userID && isFinal == true) {

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
            }, function(req, res, body, err) {
                if (err) {
                    console.log(err);
                } else {
                    updateMatchFromApi(gameID);
                    console.log("Scorekeeper " + userID + " added new score");
                    var destination = '/match/' + gameID + '/?message=Match is succesfully updated with final score';
                    res.redirect(destination);
                }
            });

        } else {
            console.log("Regular user added new score");
            var destination = '/match/' + gameID + '?message=Match is succesfully updated';
            res.redirect(destination);
        }
    });
});

module.exports = router;
