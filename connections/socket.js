function init(server) {
    var io = require('socket.io').listen(server);

    io.on('connection', function(socket) {
		// If connected with socket
        console.log("Connected with socket.io");

		// Include lib
		require('../lib/socket-io.js')(io, socket);

        // If disconnected with socket
        socket.on("disconnect", function() {
            console.log("Connection lost with socket.io");
        });
    });
}

module.exports = init;
