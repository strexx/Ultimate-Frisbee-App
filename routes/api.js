var express = require('express'),
    router = express.Router(),
    request = require('request'),
    dateFormat = require('dateformat'),
    session = require('express-session'),
    mongodb = require('mongodb'),
    //ObjectId = require('mongodb').ObjectID,
    MongoClient = mongodb.MongoClient,
    //assert = require('assert'),
    url = 'mongodb://146.185.135.172:27017/ultifris';


router.get('/matches/live', function(req, res) {
  request({
        url: 'https://api.leaguevine.com/v1/games/?tournament_id=19746&starts_after=2015-06-12T11%3A00%3A00%2B02%3A00&order_by=%5Bstart_time%5D&limit=5&access_token=6dc9d3795a',
        json: true
    }, function(error, response, data) {
        if (!error && response.statusCode == 200) {
            var objects = data.objects;

            for (var key in objects) {
                objects[key].start_time = dateFormat(objects[key].start_time, "HH:MM");
                objects[key].game_site.name = objects[key].game_site.name.split('.')[0];
            }
            res.render('matches', {
                title: 'Matches',
                items: objects,
                layout: false
            });
        }
    });
});

router.get('/matches/recent', function(req, res) {
    request({
        url: 'https://api.leaguevine.com/v1/games/?tournament_id=19746&starts_before=2015-06-12T11%3A00%3A00%2B02%3A00&order_by=%5B-start_time%5D&limit=5&access_token=6dc9d3795a',
        json: true
    }, function(error, response, data) {
        if (!error && response.statusCode == 200) {
            var objects = data.objects;

            for (var key in objects) {
                objects[key].start_time = dateFormat(objects[key].start_time, "HH:MM");
                objects[key].game_site.name = objects[key].game_site.name.split('.')[0];
            }
            res.render('matches', {
                title: 'Matches',
                items: objects,
                layout: false
            });
        }
    });
});

router.get('/matches/upcoming', function(req, res) {
    request({
        url: 'https://api.leaguevine.com/v1/games/?tournament_id=19746&starts_after=2015-06-12T14%3A00%3A00%2B02%3A00&order_by=%5Bstart_time%5D&limit=5&access_token=6dc9d3795a',
        json: true
    }, function(error, response, data) {
        if (!error && response.statusCode == 200) {
            var objects = data.objects;

            for (var key in objects) {
                objects[key].start_time = dateFormat(objects[key].start_time, "HH:MM");
                objects[key].game_site.name = objects[key].game_site.name.split('.')[0];
            }
            res.render('matches', {
                title: 'Matches',
                items: objects,
                layout: false
            });
        }
    });
});

router.get('/tournaments', function(req, res) {
    request({
        url: 'https://api.leaguevine.com/v1/tournaments/?tournament_ids=%5B19753%2C19751%2C19752%5D&access_token=bbe603bb50',
        json: true
    }, function(error, response, data) {
        if (!error && response.statusCode == 200) {
            var objects = data.objects;
            res.render('tournaments', {
                title: 'Tournaments',
                items: objects,
                layout: false
            });
        }
    });
});

router.get('/match/:gameID', function(req, res) {
    var gameID = req.params.gameID,
        session = req.session.user_id;
    request({
        url: 'https://api.leaguevine.com/v1/games/' + gameID + '/?access_token=3aa4afb621',
        json: true
    }, function(error, response, data) {
        if (!error && response.statusCode == 200) {
            var objects = data;

            objects.start_time = dateFormat(objects.start_time, "HH:MM");
            objects.game_site.name = objects.game_site.name.split('.')[0];

            res.render('match', {
                title: 'Match',
                items: objects,
                user: session,
                layout: false
            });
        }
    });
});

router.post('/login', function(req, res) {

    var post = req.body,
        email, password;

    var session = req.session;

    if (post) {
        email = req.body.email,
            password = req.body.password;
    } else {
        console.log("error g");
    }

    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established!');
            var collection = db.collection('accounts');

            collection.findOne({
                email: email,
                password: password
            }, function(err, account) {
                if (err) throw err;
                if (account) {
                    req.session.user_id = account._id;
                    console.log("username" + email + " password: " + account.password + "user_id" + req.session.user_id);
                    res.redirect('/');
                } else {

                }
                db.close();
                console.log('Connection closed!');
            });
        }
    });

});

module.exports = router;
