var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    url = 'mongodb://146.185.135.172:27017/ultifris',
    dateFormat = require('dateformat'),
    request = require('request');


MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        //HURRAY!! We are connected.
        console.log('Connection established!');

        // Get the documents collection
        var accountsCollection = db.collection('accounts');
        //var collection = db.collection('matches');

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


        //Create API DB
        var matchesCollection = db.collection('matches');

        function updateMatches(time) {
            request({
                url: 'https://api.leaguevine.com/v1/games/?tournament_id=19746&starts_after=2015-06-12T11%3A00%3A00%2B02%3A00&order_by=%5Bstart_time%5D&limit=5&access_token=6dc9d3795a',
                json: true
            }, function(error, response, data) {
                if (!error && response.statusCode == 200) {
                    var objects = data.objects;

                    // console.log(objects.id);
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
                    // console.log('Inserted documents into the "objects" collection. The documents inserted with "_id" are:', result.length, result);
                }
            });
        }


        //addUsers();
        //deleteUsers();
        // addMatches();
        // deleteMatches();

        updateMatches();

        function updateDBInterval(time) {
          setInterval(function() {
            updateMatches();
          }, time);
        }
        updateDBInterval(60000);
        //
        // console.log('Full list of collections are:', matchesCollection);


    }
});
