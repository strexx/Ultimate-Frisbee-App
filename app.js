var express = require('express'),
    app = express(),
    hbs = require('hbs'),
    path = require("path"),
    mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    bodyParser = require('body-parser'),
    session = require('express-session'),
    fileStore = require('session-file-store')(session),
    server = require('http').createServer(app),
    routes = require('./routes/index'),
    cookieParser = require('cookie-parser'),
    api = require('./routes/api');

// include connections
require('./connections/database.js')(mongodb, MongoClient);
require('./connections/socket.js')(server);

// include partials
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partials/header');
hbs.registerPartials(__dirname + '/views/partials/content');
hbs.registerPartials(__dirname + '/views/partials/footer');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// use bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// set session with secret
app.use(session({
    cookieName: 'userSession',
    secret: 'SsssttItsASecret',
    store: new fileStore(),
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: false
    }
}));

app.use(cookieParser());

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

// start app
server.listen(3010, function() {
    console.log('listening on port 3010!');
});
