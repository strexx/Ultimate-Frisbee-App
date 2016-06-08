var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient
    url = 'mongodb://146.185.135.172:27017/ultifris';


MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established with MongoDB!');

        // Get the documents collection
        var collection = db.collection('accounts');
        //var collection = db.collection('matches');

        //Create some users accounts
        var user1 = {
            username: 'admin',
            password: 'password',
            role: 'admin'
        };
        var user2 = {
            username: 'user',
            password: 'password',
            role: 'user'
        };

        // Insert some users
        // collection.insert([user1, user2], function(err, result) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log('Inserted documents into the "accounts" collection. The documents inserted with "_id" are:', result.length, result);
        //     }
        //     db.close();
        // });


        // Drop collection
        // collection.drop(function(err, result) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log('Removed documents into the "accounts" collection. The documents inserted with "_id" are:',  result);
        //     }
        //     db.close();
        // });

        //console.log('Full list of collections are:', collection);


    }
});
