var dateFormat = require('dateformat'),
    request = require('request'),
    multiRequest = require('../modules/multirequest.js'),
    passwordHash = require('password-hash');

function init(db) {

    // Create global db var
    global.db = db;

    // Get the documents collection
    var accountsCollection = db.collection('accounts'),
        matchesCollection = db.collection('matches'),
        tournamentsCollection = db.collection('tournaments');


    //Create some users accounts
    var admin = {
        email: 'admin@test.nl',
        password: passwordHash.generate('test'),
        role: 'admin'
    };
    var fons = {
        email: 'ffh_93@live.nl',
        password: passwordHash.generate('onderbaas'),
        role: 'user'
    };
    var senny = {
        email: 'sennykalidien@gmail.com',
        password: passwordHash.generate('bovenbaas'),
        role: 'user'
    };

    var melvin = {
        email: 'melreijnoudt@gmail.com',
        password: passwordHash.generate('eindbaas'),
        role: 'user'
    };

    // Insert some users
    function updateUsers() {
        deleteUsers();
        addUsers();
    }

    // Drop collection
    function deleteUsers() {
        accountsCollection.drop(function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Removed documents from the "accounts" collection. The documents inserted with "_id" are:', result);
            }
            db.close();
        });
    }

    // Insert some users
    function addUsers() {
        accountsCollection.insert([admin, fons, senny, melvin], function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Inserted documents into the "accounts" collection. The documents inserted with "_id" are:', result.length, result);
            }
            db.close();
        });
    }

    function updateMatches() {
        console.log('Getting matches from API...');

        var urls = ["https://api.leaguevine.com/v1/games/?tournament_id=20058&order_by=%5Bstart_time%5D&limit=100&access_token=6dc9d3795a", "https://api.leaguevine.com/v1/games/?tournament_id=20059&order_by=%5Bstart_time%5D&limit=100&access_token=6dc9d3795a", "https://api.leaguevine.com/v1/games/?tournament_id=20060&order_by=%5Bstart_time%5D&limit=100&access_token=6dc9d3795a",
        "https://api.leaguevine.com/v1/games/?tournament_id=20297&order_by=%5Bstart_time%5D&limit=100&access_token=6dc9d3795a"];

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
                        var teamName_1 = responsesObj[key].team_1;
                        var teamName_2 = responsesObj[key].team_2;

                        if (responsesObj[key].start_time !== undefined && responsesObj[key].start_time !== null) {
                            responsesObj[key].start_time = dateFormat(responsesObj[key].start_time, "dd-mm-yyyy HH:MM");
                        }
                        if (responsesObj[key].game_site !== undefined && responsesObj[key].game_site !== null) {
                            responsesObj[key].game_site.name = responsesObj[key].game_site.name.slice(0, 8);
                        }

                        if(teamName_1 !== undefined) {
                            if(teamName_1.short_name) {
                                teamName_1.short_name = teamName_1.short_name.replace("Test ", "");
                            }
                        }

                        if(teamName_2 !== undefined) {
                            if(teamName_2.short_name) {
                                teamName_2.short_name = teamName_2.short_name.replace("Test ", "");
                            }
                        }

                        objects.push(responsesObj[key]);
                    }
                }
            }


            deleteMatches();
            addMatches(objects);
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

    function printMatches() {
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

    function updateTournaments() {
        console.log('Getting tournaments from API...');

        var urls = ["https://api.leaguevine.com/v1/swiss_rounds/?tournament_id=20058&access_token=3c085d6bfc", "https://api.leaguevine.com/v1/swiss_rounds/?tournament_id=20058&access_token=3c085d6bfc", "https://api.leaguevine.com/v1/swiss_rounds/?tournament_id=20058&access_token=3c085d6bfc"];

        multiRequest(urls, function(responses) {

            var url,
                responses,
                objectsTournaments = [],
                objectsRounds = [],
                objectsRanking = [];

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
                    var responsesObj = parsedResponse.objects;

                    for (var key in responsesObj) {
                        var gamesArray = responsesObj[key].games;
                        var rankingArray = responsesObj[key].standings;

                        for (var anotherKey in gamesArray) {
                            var teamName_1 = gamesArray[anotherKey].team_1;
                            var teamName_2 = gamesArray[anotherKey].team_2;

                            if (gamesArray[anotherKey].start_time !== undefined && gamesArray[anotherKey].start_time !== null) {
                                gamesArray[anotherKey].start_time = dateFormat(gamesArray[anotherKey].start_time, "dd-mm-yyyy HH:MM");
                            }
                            if (gamesArray[anotherKey].game_site !== undefined && gamesArray[anotherKey].game_site !== null) {
                                gamesArray[anotherKey].game_site.name = gamesArray[anotherKey].game_site.name.slice(0, 8);
                            }

                            if(teamName_1 !== undefined) {
                                if(teamName_1.short_name) {
                                    teamName_1.short_name = teamName_1.short_name.replace("Test ", "");
                                }
                            }

                            if(teamName_2 !== undefined) {
                                if(teamName_2.short_name) {
                                    teamName_2.short_name = teamName_2.short_name.replace("Test ", "");
                                }
                            }

                            objectsRounds.push(gamesArray[anotherKey]);
                        }
                        for (var anotherOtherKey in rankingArray) {
                            objectsRanking.push(rankingArray[anotherOtherKey]);
                        }
                        objectsTournaments.push(responsesObj[key]);
                    }
                }
            }

            // console.log(objectsTournaments);

            deleteTournaments();
            addTournaments(objectsTournaments);
        });

    }

    function deleteTournaments() {
        tournamentsCollection.drop(function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Removed documents from the "tournaments" collection.', result);
            }
        });
    }

    function addTournaments(objects) {
        tournamentsCollection.insert(objects, {
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

    function printTournaments() {
        var collectionCursor = db.collection('tournaments').find();
        collectionCursor.each(function(err, tournament) {
            if (tournament !== null) {
                console.log(tournament);
            } else {
                console.log("There are no tournaments (anymore) in the database");
            }
        });
    }

    // init user functions
    // updateUsers();

    // init matches functions
    // updateMatches();
    // printMatches();

    // init tournaments functions
    // updateTournaments();
    // printTournaments

    // Set intervals
    //updateIntervalMatches(60000);
}

module.exports = init;
