var io = require('socket.io').listen(server),
    express = require('express'),
    request = require('request');

// socket.io implementation
io.on('connection', function(socket) {
    // succes message
    console.log("Connection with Socket.IO successful");

    // if addScore event is fired log data on server
    socket.on('addScore', function(data) {

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


        request.post({
            url: url,
            body: postData,
            headers: headers
        }, function(req, res, body) {
            socket.emit("apiupdate", body);
            console.log(body);
        });

        // send data to client
        socket.emit('broad', data);
    });

    // If disconnected with socket
    socket.on("disconnect", function() {
        console.log("Connection lost");
    });
});
