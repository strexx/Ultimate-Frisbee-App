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
                var score1 = document.querySelector("#team1").value,
                    score2 = document.querySelector("#team2").value
                addScore(score1, score2);
            });
        }

        // Add score (min or plus for teams)
        function addScore(score1, score2) {
            // Send score to socket
            socket.emit('addScore', {
                score1: score1,
                score2: score2,
                time: Date.now()
            });
        }

        socket.on('broad', function(data) {
            // Do stuff with data on the client
        });
    }

    return {
        socket: socket
    };

})();
