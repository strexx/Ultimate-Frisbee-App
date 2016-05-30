var express = require('express'),
	path = require("path"),
	bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//define static path
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
app.listen(3010, function() {
    console.log('listening on port 3010!');
});
