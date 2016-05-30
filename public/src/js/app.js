// Connect with socket
var socket = io.connect("http://localhost:3010"),
    submit = document.querySelector("#submit");

submit.addEventListener("click", function(e) {
    e.preventDefault();
    var team1 = document.querySelector("#team1").value,
        team2 = document.querySelector("#team2").value
    addScore(team1, team2);
});

// Add score (min or plus for teams)
function addScore(score1, score2) {
    // Send score to socket
    socket.emit('addScore', {
        score1: score1,
        score2: score2,
        time: Date.now()
    });
}
