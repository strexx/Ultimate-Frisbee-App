var express = require('express'),
    router = express.Router(),
    request = require('request'),
    dateFormat = require('dateformat'),
    session = require('express-session'),
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

router.post('/match/score', function(req, res) {

    var post = req.body;

    if (post) {

      console.log(post);

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
          gameID: parseInt(gameID),
          team_1_score: score1,
          team_2_score: score2,
          isFinal: isFinal,
          userID: userID
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
            }, function(req, res, body) {
                console.log("Scorekeeper " + userID + " added new score");
            });

        } else {
            console.log("Regular user added new score");
            res.redirect('/match/' + gameID);
        }
    });
});

module.exports = router;
