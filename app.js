var fs = require('fs'),
    express = require('express'),
    hbs = require('hbs'),
    path = require("path"),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io'),
    // Include routes
    routes = require('./routes/index'),
    api = require('./routes/api'),
    // Include MongoDB
    mongoDB = require('./lib/mongodb.js');

    // Include Socket.io file
    require('./lib/sockets/connection.js')(server);

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partials/header');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// set routes
app.use('/', routes);
app.use('/api/', api);

// set session with secret
app.use(session({
    secret: 'soSecureMuchEncryption',
    genid: function(req) {
        return generateUUID() // use UUIDs for session IDs
    },
    store: new FileStore(),
    saveUninitialized: true,
    resave: false
}));

// define static path
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

//start app
server.listen(3010, function() {
    console.log('listening on port 3010!');
});
