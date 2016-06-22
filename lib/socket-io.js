var request = require('request'),
    multiRequest = require('../modules/multirequest.js'),
    dateFormat = require('dateformat'),
    matchesLogic = require('../modules/matches.js');

// Get the documents collection
var accountsCollection = db.collection('accounts'),
    matchesCollection = db.collection('matches');

function updateMatches(db) {

    var urls = ["https://api.leaguevine.com/v1/games/?tournament_id=20058&order_by=%5Bstart_time%5D&limit=100&access_token=6dc9d3795a", "https://api.leaguevine.com/v1/games/?tournament_id=20059&order_by=%5Bstart_time%5D&limit=100&access_token=6dc9d3795a", "https://api.leaguevine.com/v1/games/?tournament_id=20060&order_by=%5Bstart_time%5D&limit=100&access_token=6dc9d3795a",
        "https://api.leaguevine.com/v1/games/?game_ids=%5B203482%2C%20203481%5D&access_token=6dc9d3795a"
    ];

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


function init(io, socket) {
    //console.log(socket);

    // if addScore event is fired log data on server
    socket.on('addScore', function(data) {

        // Postdata
        var postData = JSON.stringify({
            game_id: parseInt(data.gameID),
            team_1_score: data.score1,
            team_2_score: data.score2,
            is_final: data.isFinal
        });

        // Update match with new scores in database
        var updateMatch = function(db, callback) {
            var matchesCollection = db.collection('matches');
            matchesCollection.updateOne({
                    id: parseInt(data.gameID)
                }, {
                    $set: {
                        team_1_score: data.score1,
                        team_2_score: data.score2
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
            console.log("Match " + data.gameID + " updated");

            // Send data to client
            // socket.emit('dbupdate', postData);
            // socket.broadcast.emit('dbupdate', 'Data synced with all users');


            // Broadcast socket data to client
            io.emit('dbupdate', postData);

            //If scorekeeper is logged in and score is final score > post to API
            if (data.userID && data.isFinal == true) {

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
                    // Callback for if API is updated?
                    // socket.emit("dbupdate", body);
                    // console.log(body);
                    if (err) {
                        console.log(err);
                    } else {
                        updateMatches();
                        console.log("Scorekeeper " + data.userID + " added new score");
                    }
                });
            } else {
                console.log("Regular user added new score");
            }
        });
    });
}

module.exports = init;
