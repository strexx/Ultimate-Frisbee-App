var express = require('express'),
    app = express(),
    hbs = require('hbs'),
    path = require("path"),
    mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    bodyParser = require('body-parser'),
    session = require('express-session'),
    io = require('socket.io'),
    fileStore = require('session-file-store')(session);
    routes = require('./routes/index'),
    api = require('./routes/api');

// include partials
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partials/header');
hbs.registerPartials(__dirname + '/views/partials/content');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// use bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// set session with secret
app.use(session({
    cookieName: 'userSession',
    secret: 'soSecureMuchEncryption',
    store: new fileStore(),
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: false
    }
}));

// set routes
app.use('/', routes);
app.use('/api/', api);

// define static path for client
app.use(express.static(path.join(__dirname, 'public')));

// development error handler - will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler - no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Make mongodb connection & start server
MongoClient.connect('mongodb://146.185.135.172:27017/ultifris', function(err, database) {
    if (err) {
        console.log('Unable to connect to the MongoDB server. Error:', err);
    } else {
        console.log('Connection with MongoDB established!');

        // create global variables
        global.db = database;
        global.server = require('http').createServer(app);

        // include lib files
        require('./lib/sockets.js');
        require('./lib/database.js');

        // start app
        server.listen(3010, function() {
            console.log('listening on port 3010!');
        });
    }
});
