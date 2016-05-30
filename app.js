var express = require('express'),
    path = require("path"),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    api = require('./routes/api'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

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

// define static path
app.use(express.static(path.join(__dirname, 'public')));

// Socket IO implementation
io.on('connection', function(socket) {
    // Connection with socket
    console.log("Connection succesfull");

    // If addScore event is fired log data on server
    socket.on('addScore', function(data) {
        console.log(data);

        // Todo: Server logic for getting data
        //////
        //////

        socket.emit('broad', data);

        // Send data to all sockets except addScore
        //socket.broadcast.emit('broad', data);
    });

    // If disconnected with socket
    socket.on("disconnect", function () {
        console.log("Connection lost");
    });
});

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
