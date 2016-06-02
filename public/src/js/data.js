/*********************************************************
	DATA REQUEST
*********************************************************/
UFA.data = (() => {

    function socket() {
        // Connect with socket
        var socket = io.connect("http://localhost:3010"),
            submit = document.querySelector("#submit");

        if (submit != null) {
            submit.addEventListener("click", function(e) {
                e.preventDefault();
                var score1 = document.querySelector(".team__home__info__score").innerHTML,
                    score2 = document.querySelector(".team__away__info__score").innerHTML,
                    gameID = window.location.pathname.split('/')[2];
                addScore(score1, score2, gameID);
                UFA.ux.showLoader();
                this.replaceScores(score1, score2);
            });
        }

        // Add score (min or plus for teams)
        function addScore(score1, score2, gameID) {
            // Send score to socket
            socket.emit('addScore', {
                score1: score1,
                score2: score2,
                gameID: gameID,
                time: Date.now()
            });
        }

        function replaceScores(score1, score2) {
          socket.on("apiupdate", function(data) {

            var updateScore1 = data.team_1_score,
                updateScore2 = data.team_1_score;

                score1 = updateScore1;
                score2 = updateScore2;

                UFA.ux.hideLoader();
          }
        }

        socket.on('broad', function(data) {
            // Do stuff with data on the client
        });
    }

    return {
        socket: socket,
        replaceScores: replaceScores
    };

})();
