var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient
    url = 'mongodb://146.185.135.172:27017/ultifris';


MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established!');

        // Get the documents collection
        var collection = db.collection('accounts');
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
            collection.insert([admin, fons, senny, melvin], function(err, result) {
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
            collection.drop(function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Removed documents into the "accounts" collection. The documents inserted with "_id" are:',  result);
                }
                db.close();
            });
        }

        //addUsers();
        //deleteUsers();

        console.log('Full list of collections are:', collection);


    }
});
