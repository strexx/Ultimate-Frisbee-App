function init (mongoDB, MongoClient) {
	// Make mongodb connection & start server
	MongoClient.connect('mongodb://146.185.135.172:27017/ultifris', function(err, database) {
	    if (err) {
	        console.log('Unable to connect to the MongoDB server. Error:', err);
	    } else {
	        console.log('Connected with MongoDB');

	        var db = database;

			// Include lib
			require('../lib/mongodb.js')(db);
	    }
	});
}

module.exports = init;
