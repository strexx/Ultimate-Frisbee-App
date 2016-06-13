var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    dateFormat = require('dateformat'),
    request = require('request');

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
    request({
        url: 'https://api.leaguevine.com/v1/games/?tournament_id=19746&starts_before=2015-06-12T23%3A59%3A59-02%3A00&starts_after=2015-06-12T00%3A00%3A00-02%3A00&order_by=%5Bstart_time%5D&limit=80&access_token=6dc9d3795a',
        json: true
    }, function(error, response, data) {
        if (!error && response.statusCode == 200) {
            var objects = data.objects;

             console.log(objects.id);
            for (var key in objects) {
                objects[key].start_time = dateFormat(objects[key].start_time, "HH:MM");
                objects[key].game_site.name = objects[key].game_site.name.split('.')[0];
            }
            deleteMatches();
            addMatches(objects);

        }
    });
}

function deleteMatches() {
    matchesCollection.drop(function(err, result) {
        if (err) {
            console.log(err);
        } else {
            // console.log('Removed documents from the "matches" collection. The documents inserted with "_id" are:', result);
        }
    });
}

function addMatches(objects) {
    matchesCollection.insert(objects, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            //console.log('Inserted documents into the "objects" collection. The documents inserted with "_id" are:', result.length, result);
        }
    });
}

function updateIntervalMatches(time) {
    setInterval(function() {
        updateMatches();
    }, time);
}

function printMatches() {
    var collectionCursor = db.collection('matches').find();
    collectionCursor.each(function(err, match) {
        if (match != null) {
            console.log(match);
        } else {
            console.log("There are no matches in the database");
        }
    });
}


// addUsers();
// deleteUsers();

// addMatches();
// deleteMatches();
updateMatches();
//printMatches();

// Set interval
updateIntervalMatches(60000);
