var io,
    express = require('express'),
    request = require('request');


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

            // Todo: Server logic for getting data
            var url = "https://api.leaguevine.com/v1/game_scores/",
                headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'bearer 40e50065ad'
                };

            var postData = JSON.stringify({
                game_id: data.gameID,
                team_1_score: data.score1,
                team_2_score: data.score2,
                is_final: data.isFinal
            });

            console.log(postData);


            request.post({url: url, body: postData, headers: headers
            }, function(req, res, body) {
                socket.emit("apiupdate", body);
                console.log(body);
            });

            // Send data to client
            socket.emit('broad', data);
        });

        // If disconnected with socket
        socket.on("disconnect", function() {
            console.log("Connection lost");
        });
    });
}

module.exports = init;
