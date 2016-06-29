var dateFormat = require('dateformat'),
    request = require('request'),
    multiRequest = require('../modules/multirequest.js'),
    passwordHash = require('password-hash');



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

function printMatches(db) {
    var collectionCursor = db.collection('matches').find();
    collectionCursor.each(function(err, match) {
        if (match !== null) {
            console.log(match);
        } else {
            console.log("There are no matches (anymore) in the database");
        }
    });
}

function updateIntervalMatches(time) {
    setInterval(function() {
        updateMatches();
    }, time);
}


module.exports = {
  updateMatches: updateMatches,
  addMatches: addMatches,
  deleteMatches: deleteMatches,
  printMatches: printMatches,
  updateIntervalMatches: updateIntervalMatches
}
