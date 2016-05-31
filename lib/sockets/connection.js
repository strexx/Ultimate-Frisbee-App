var io;

function init(server) {
    io = require('socket.io').listen(server);
    // Connection with socket
    console.log("Connection with socketio successful");
    addListeners();
}

function addListeners() {

  // Socket IO implementation
  io.on('connection', function(socket) {

      // If addScore event is fired log data on server
      socket.on('addScore', function(data) {
          console.log(data);

          // Todo: Server logic for getting data
          //////
          //////

          // Send data to client
          socket.emit('broad', data);
      });

      // If disconnected with socket
      socket.on("disconnect", function () {
          console.log("Connection lost");
      });
  });
}

module.exports = init;
