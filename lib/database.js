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

/**
 * Handle multiple requests at once
 * @param urls [array]
 * @param callback [function]
 * @requires request module for node ( https://github.com/mikeal/request )
 */
var __request = function (urls, callback) {

	'use strict';

	var results = {}, t = urls.length, c = 0,
		handler = function (error, response, body) {

			var url = response.request.uri.href;

			results[url] = { error: error, response: response, body: body };

			if (++c === urls.length) { callback(results); }

		};

	while (t--) { request(urls[t], handler); }
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

  var urls = ["https://api.leaguevine.com/v1/games/?tournament_id=20058&starts_before=2016-06-03T23%3A59%3A59-02%3A00&starts_after=2016-06-03T00%3A00%3A00-02%3A00&order_by=%5Bstart_time%5D&limit=80&access_token=6dc9d3795a",
     "https://api.leaguevine.com/v1/games/?tournament_id=20059&starts_before=2016-06-03T23%3A59%3A59-02%3A00&starts_after=2016-06-03T00%3A00%3A00-02%3A00&order_by=%5Bstart_time%5D&limit=80&access_token=6dc9d3795a",
     "https://api.leaguevine.com/v1/games/?tournament_id=20060&starts_before=2016-06-03T23%3A59%3A59-02%3A00&starts_after=2016-06-03T00%3A00%3A00-02%3A00&order_by=%5Bstart_time%5D&limit=80&access_token=6dc9d3795a"];

  __request(urls, function(responses) {

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
            responsesObj[key].start_time = dateFormat(responsesObj[key].start_time, "HH:MM");
            if(responsesObj[key].game_site && responsesObj[key].game_site.name !== "")
              responsesObj[key].game_site.name = responsesObj[key].game_site.name.split('.')[0];
        }
        objects.push(responsesObj);
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
            console.log('Removed documents from the "matches" collection. The documents inserted with "_id" are:', result);
        }
    });
}

function addMatches(objects) {
    objects.forEach(function(key) {
      matchesCollection.insert(key, function(err, result) {
          if (err) {
              console.log(err);
          } else {
              console.log('Inserted documents into the "objects" collection. The documents inserted with "_id" are:', result.length, result);
          }
      });
    });
}

function updateIntervalMatches(time) {
    setInterval(function() {
        updateMatches();
    }, time);
}

function printMatches() {
    var collectionCursor = db.collection('matches').find();
    var i = 0;
    collectionCursor.each(function(err, match) {
        if (match != null) {
            console.log(match);
            i++;
            // console.log(i);
        } else {
            console.log("There are no matches (anymore) in the database");
        }
    });
    // console.log("Aantal records: " + i);
}


// addUsers();
// deleteUsers();

// addMatches();
// deleteMatches();
// updateMatches();
// printMatches();

// Set interval
//updateIntervalMatches(60000);
