var dateFormat = require('dateformat'),
    request = require('request'),
    multiRequest = require('../modules/multirequest.js');

// Get the documents collection
var accountsCollection = db.collection('accounts'),
    matchesCollection = db.collection('matches');

//Create some users accounts
var admin = {
    email: 'admin@test.nl',
    password: 'test',
    role: 'admin'
};
var fons = {
    email: 'ffh_93@live.nl',
    password: 'onderbaas',
    role: 'user'
};
var senny = {
    email: 'sennykalidien@gmail.com',
    password: 'bovenbaas',
    role: 'user'
};

var melvin = {
    email: 'melreijnoudt@gmail.com',
    password: 'eindbaas',
    role: 'user'
};

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

function updateMatches() {

    // var urls = ["https://api.leaguevine.com/v1/games/?tournament_id=20058&starts_before=2016-06-03T23%3A59%3A59-02%3A00&starts_after=2016-06-03T00%3A00%3A00-02%3A00&order_by=%5Bstart_time%5D&limit=80&access_token=6dc9d3795a", "https://api.leaguevine.com/v1/games/?tournament_id=20059&starts_before=2016-06-03T23%3A59%3A59-02%3A00&starts_after=2016-06-03T00%3A00%3A00-02%3A00&order_by=%5Bstart_time%5D&limit=80&access_token=6dc9d3795a", "https://api.leaguevine.com/v1/games/?tournament_id=20060&starts_before=2016-06-03T23%3A59%3A59-02%3A00&starts_after=2016-06-03T00%3A00%3A00-02%3A00&order_by=%5Bstart_time%5D&limit=80&access_token=6dc9d3795a"
    // ];

    var urls = ["https://api.leaguevine.com/v1/games/?tournament_id=20058&order_by=%5Bstart_time%5D&limit=100&access_token=6dc9d3795a", "https://api.leaguevine.com/v1/games/?tournament_id=20059&order_by=%5Bstart_time%5D&limit=100&access_token=6dc9d3795a", "https://api.leaguevine.com/v1/games/?tournament_id=20060&order_by=%5Bstart_time%5D&limit=100&access_token=6dc9d3795a"
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
                    responsesObj[key].start_time = dateFormat(responsesObj[key].start_time, "dd-mm-yyyy HH:MM");
                    if (responsesObj[key].game_site !== null ) {
                        responsesObj[key].game_site.name = responsesObj[key].game_site.name.slice(0, 8);
                    }
                    objects.push(responsesObj[key]);
                }
            }
        }

        //console.log(objects);

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
    matchesCollection.insert(objects, {keepGoing: true, continueOnError: true}, function(err, result) {
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
        if (match != null) {
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

// init user functions
// addUsers();
// deleteUsers();

// init matches functions
// addMatches();
// deleteMatches();
// updateMatches();
// printMatches();

// Set interval
//updateIntervalMatches(60000);
