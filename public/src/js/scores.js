/*********************************************************
	DATA REQUEST
*********************************************************/
UFA.scores = (() => {
    var socket = io.connect("http://localhost:3010"),
        submit = document.querySelector("#submit"),
        /* Match */
        btns = document.querySelectorAll(".match__item__form button"),
        inputs = document.getElementsByClassName("match__team__info__input"),
        checkboxes = document.getElementsByClassName("match__item__submit__checkbox"),
        gameID = window.location.pathname.split('/')[2],
        activeProgress = false,
        team1_score_span = document.getElementsByClassName("team__home__info__score"),
        team2_score_span = document.getElementsByClassName("team__away__info__score"),
        /* Matches */
        matchesBtns = document.querySelectorAll(".match__item__form button");

    function matchInit() {
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

    function showElem(el) {
      el.classList.remove("hidden");
      el.classList.add("is-visible");
    }

    function hideElem(el) {
      el.classList.remove("is-visible");
      el.classList.add("hidden");
    }

    function moveBar(score1, score2) {

      // Get needed elements
      var progressElem = document.getElementById("progress"),
          progressBar = document.getElementById("progressBar"),
          label = document.getElementById("label-progress"),
          messageLabel = document.getElementById("messageLabel"),
          width = 0,
          id = setInterval(frame, 20),
          old_score1 = document.querySelector('.match__item__team__home .match__item__team__info__score'),
          old_score2 = document.querySelector('.match__item__team__away .match__item__team__info__score'),
          queue_score_1 = document.querySelector('#queue_score_1'),
          queue_score_2 = document.querySelector('#queue_score_2'),
          gameID = window.location.pathname.split('/')[2],
          isFinal = false,
          scoreBtn = true,
          userID = null;

      // console.log(activeProgress);

      // Show progress bar
      showElem(progressElem);

      queue_score_1.innerHTML = score1;
      queue_score_2.innerHTML = score2;

      if(activeProgress === true) {
        clearInterval(id);
        width = 0;
        progressBar.style.width = 0 + '%';
        // Set score in label
        queue_score_1.innerHTML = score1;
        queue_score_2.innerHTML = score2;

        console.log(score1);
        console.log(score2);

        setInterval(frame, 20);
      }

      function frame() {
        activeProgress = true;

        // console.log(activeProgress);

        if (width >= 100) {
          clearInterval(id);

          messageLabel.innerHTML = "Score updated to: ";

          addScore(score1, score2, gameID, isFinal, userID, scoreBtn);

          setTimeout(function() {
            width = 0;
            messageLabel.innerHTML = "";
            progressBar.style.width = 0 + '%';
            // hideElem(progressElem);
            activeProgress = false;

            queue_score_1.innerHTML = score1;
            queue_score_2.innerHTML = score2;

          }, 1000);

        } else {
          width++;
          progressBar.style.width = width + '%';
        }
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
        team1_score_span[0].innerHTML = score1;
        team2_score_span[0].innerHTML = score2;
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
                    button.classList.add("pop--active");
                    setTimeout(function () {
                      button.classList.remove("pop--active");
                    }, 1000)
                };
            }(button), false);
        });
    }

    // Show normal scores instead of inputs
    function showScores() {
        team1_score_span[0].classList.remove("hidden");
        team2_score_span[0].classList.remove("hidden");
        team1_score_span[0].classList.add("is-visible");
        team2_score_span[0].classList.add("is-visible");
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

            if(activeProgress == true) {
              var queue_score_1 = document.querySelector('#queue_score_1').innerHTML;
              var queue_score_2 = document.querySelector('#queue_score_2').innerHTML;

              var newQueueScore = Number(queue_score_1) - 1;

              moveBar(newQueueScore, queue_score_2);

            } else {
                moveBar(newScore, score2);
            }

            // addScore(newScore, score2, gameID, isFinal, userID, scoreBtn);

        } else if (buttonId === "team__away__minus") {
            var score2HTML = score2.innerHTML;
            var score1 = Number(score1.innerHTML);
            var newScore = Number(score2HTML) - 1;
            //score2.innerHTML = newScore;

            if(activeProgress == true) {
              var queue_score_1 = document.querySelector('#queue_score_1').innerHTML;
              var queue_score_2 = document.querySelector('#queue_score_2').innerHTML;

              var newQueueScore = Number(queue_score_2) - 1;

              moveBar(queue_score_1, newQueueScore);

            } else {
                moveBar(score1, newScore);
            }

            // addScore(score1, newScore, gameID, isFinal, userID, scoreBtn);

        } else if (buttonId === "team__home__plus") {
            var score1HTML = score1.innerHTML;
            var score2 = Number(score2.innerHTML);
            var newScore = Number(score1HTML) + 1;
            //score1.innerHTML = newScore;

            if(activeProgress == true) {
              var queue_score_1 = document.querySelector('#queue_score_1').innerHTML;
              var queue_score_2 = document.querySelector('#queue_score_2').innerHTML;

              var newQueueScore = Number(queue_score_1) + 1;

              moveBar(newQueueScore, queue_score_2);

            } else {
                moveBar(newScore, score2);
            }

            // addScore(newScore, score2, gameID, isFinal, userID, scoreBtn);

        } else if (buttonId === "team__away__plus") {
            var score2HTML = score2.innerHTML;
            var score1 = Number(score1.innerHTML);
            var newScore = Number(score2HTML) + 1;
            //score2.innerHTML = newScore;

            if(activeProgress == true) {
              var queue_score_1 = document.querySelector('#queue_score_1').innerHTML;
              var queue_score_2 = document.querySelector('#queue_score_2').innerHTML;

              var newQueueScore = Number(queue_score_2) + 1;

              moveBar(queue_score_1, newQueueScore);

            } else {
                moveBar(score1, newScore);
            }

            // addScore(score1, newScore, gameID, isFinal, userID, scoreBtn);
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


    function matchesInit() {


    }


    // Return functions
    return {
        matchInit: matchInit,
        changeHomeScores: changeHomeScores,
        matchesInit: matchesInit
    };

})();
