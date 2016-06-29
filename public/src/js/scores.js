/*********************************************************
	DATA REQUEST
*********************************************************/
UFA.scores = (() => {

    var socket = io.connect("http://146.185.135.172:3010"),
        submit = document.querySelector("#submit"),
        btns = document.getElementsByTagName("button"),
        inputs = document.getElementsByClassName("match__team__info__input"),
        checkboxes = document.getElementsByClassName("match__item__submit__checkbox"),
        gameID = window.location.pathname.split('/')[2],
        team1_score_span = document.getElementById("team__home__info__score__span"),
        team2_score_span = document.getElementById("team__away__info__score__span");

    function init() {
        socket.on("dbupdate", function(json) {
            var data = JSON.parse(json);

            var updateScore1 = data.team_1_score,
                updateScore2 = data.team_2_score;

            if(data.game_id == gameID)
              replaceScores(updateScore1, updateScore2);
        });

        socket.on('redirect', function(destination) {
          if(destination)
            window.location.href = destination
          else
            location.reload();
        });

        // If JS is enabled, fire these functions to add enhanced functionality
        hideInputs();
        showScores();
        scoreButtonListeners();

        if (!document.querySelector("#user_id")) {
          if(document.querySelector("#submit")) {
            hideFormSubmit();
          }
            hideCheckBoxes();
        }
    }

    function changeHomeScores() {
      socket.on("dbupdate", function(json) {
          var data = JSON.parse(json);

          // Get new scores
          var updateScoreHome1 = data.team_1_score,
              updateScoreHome2 = data.team_2_score,
              // Get article with match id
              target = document.getElementById(data.game_id),
              tdTeam1 = target.getElementsByClassName("team_1_score_realtime")[0],
              tdTeam2 = target.getElementsByClassName("team_2_score_realtime")[0];

          // Assign to html
          tdTeam1.innerHTML = updateScoreHome1;
          tdTeam2.innerHTML = updateScoreHome2;
      });
    }

    // Update scores
    function replaceScores(score1, score2) {
        team1_score_span.innerHTML = score1;
        team2_score_span.innerHTML = score2;
    };

    // Add plus and minus button click events
    function scoreButtonListeners() {
        [].forEach.call(btns, function(button) {
            button.classList.remove("hidden");
            button.classList.add("is-visible");
            button.addEventListener('click', function(index) {
                return function(e) {
                    e.preventDefault();
                    changeScore(index);
                };
            }(button), false);
        });
    }

    // Show normal scores instead of inputs
    function showScores() {
        team1_score_span.classList.remove("hidden");
        team2_score_span.classList.remove("hidden");
        team1_score_span.classList.add("is-visible");
        team2_score_span.classList.add("is-visible");
    }

    // Hide inputs when JS is disabled
    function hideInputs() {
        [].forEach.call(inputs, function(input) {
            input.classList.add("hidden");
        });
    }

    function hideFormSubmit() {
        submit.classList.add("hidden");
    }

    function hideCheckBoxes() {
        [].forEach.call(checkboxes, function(checkbox) {
            checkbox.classList.add("hidden");
        });
    }

    // Fire real time event to socket
    function changeScore(item) {
        var buttonId = item.id,
            score1 = document.querySelector('.match__item__team__home .match__item__team__info__score'),
            score2 = document.querySelector('.match__item__team__away .match__item__team__info__score'),
            gameID = window.location.pathname.split('/')[2],
            isFinal = false,
            scoreBtn = true,
            userID = null;

        if (document.querySelector("#user_id"))
            userID = document.querySelector("#user_id").value;

        if (buttonId === "team__home__minus") {
            var score1HTML = score1.innerHTML;
            var score2 = Number(score2.innerHTML);
            var newScore = Number(score1HTML) - 1;
            //score1.innerHTML = newScore;

            addScore(newScore, score2, gameID, isFinal, userID, scoreBtn);

        } else if (buttonId === "team__away__minus") {
            var score2HTML = score2.innerHTML;
            var score1 = Number(score1.innerHTML);
            var newScore = Number(score2HTML) - 1;
            //score2.innerHTML = newScore;

            addScore(score1, newScore, gameID, isFinal, userID, scoreBtn);

        } else if (buttonId === "team__home__plus") {
            var score1HTML = score1.innerHTML;
            var score2 = Number(score2.innerHTML);
            var newScore = Number(score1HTML) + 1;
            //score1.innerHTML = newScore;

            addScore(newScore, score2, gameID, isFinal, userID, scoreBtn);

        } else if (buttonId === "team__away__plus") {
            var score2HTML = score2.innerHTML;
            var score1 = Number(score1.innerHTML);
            var newScore = Number(score2HTML) + 1;
            //score2.innerHTML = newScore;

            addScore(score1, newScore, gameID, isFinal, userID, scoreBtn);
        }
    }

    // If submitted by scorekeeper
    if (submit != null) {
        submit.addEventListener("click", function(e) {
            e.preventDefault();
            var score1 = document.querySelector(".match__item__team__home .match__item__team__info__score").innerHTML,
                score2 = document.querySelector(".match__item__team__away .match__item__team__info__score").innerHTML,
                checkFinal = document.querySelector("#check:checked"),
                isFinal = false,
                scoreBtn = false,
                userID = null;

            if (document.querySelector("#user_id"))
                userID = document.querySelector("#user_id").value;

            if (checkFinal && checkFinal.value == "true")
                isFinal = true;

            addScore(score1, score2, gameID, isFinal, userID, scoreBtn);
            //UFA.ux.showLoader();
        });
    }

    // Add score (min or plus for teams) stream to socket
    function addScore(score1, score2, gameID, isFinal, userID, scoreBtn) {
        // Send score to socket
        socket.emit('addScore', {
            score1: score1,
            score2: score2,
            gameID: gameID,
            isFinal: isFinal,
            userID: userID,
            scoreBtn: scoreBtn,
            time: Date.now()
        });
    }

    // Return functions
    return {
        init: init,
        changeHomeScores: changeHomeScores
    };

})();
