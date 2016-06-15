var io = require('socket.io').listen(server),
    express = require('express'),
    request = require('request');

// socket.io implementation
io.on('connection', function(socket) {
    // succes message
    console.log("Connection with Socket.IO successful");

    // if addScore event is fired log data on server
    socket.on('addScore', function(data) {

        console.log(data);

        // Update match with new scores in database
        var updateMatch = function(db, callback) {
          var matchesCollection = db.collection('matches');
           matchesCollection.updateOne(
              { id : parseInt(data.gameID) },
              { $set: { team_1_score: data.score1, team_2_score: data.score2 } },
              function(err, results) {
                if(err) {
                  console.log(err);
                } else {
                  callback();
                }
              });
        };

        updateMatch(db, function() {
          // Log if match is updated in database
          console.log("Match " + data.gameID + " updated");

          // Send data to client
          // socket.emit('dbupdate', postData);
          // socket.broadcast.emit('dbupdate', 'Data synced with all users');

          // Postdata
          var postData = JSON.stringify({
            game_id: parseInt(data.gameID),
            team_1_score: data.score1,
            team_2_score: data.score2,
            is_final: data.isFinal,
            user_id: data.userID
          });
          // Broadcast socket data to client
          io.emit('dbupdate', postData);

          //If scorekeeper is logged in and score is final score > post to API
          if(data.userID && data.isFinal == true) {

            // Post url and headers
            var url = "https://api.leaguevine.com/v1/game_scores/",
                headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'bearer 40e50065ad'
                };


            // Post request
            request.post({
                url: url,
                body: postData,
                headers: headers
            }, function(req, res, body) {
                // Callback for if API is updated?
                // socket.emit("dbupdate", body);
                // console.log(body);
                console.log("Scorekeeper " + data.userID + " added new score");
            });
          } else {
            console.log("Regular user added new score");
          }
        });

    });

    // If disconnected with socket
    socket.on("disconnect", function() {
        console.log("Connection lost");
    });
});
