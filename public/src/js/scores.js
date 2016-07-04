/*********************************************************
	DATA REQUEST
*********************************************************/
UFA.scores = (() => {

    var socket = io.connect("http://localhost:3010"),
        timer,
        activeProgress = false;

    function matchInit() {
        var submit = document.querySelector("#submit"),
            /* Match */
            btns = document.querySelectorAll(".match__item__form button"),
            inputs = document.getElementsByClassName("match__team__info__input"),
            checkboxes = document.getElementsByClassName("match__item__submit__checkbox"),
            gameID = window.location.pathname.split('/')[2],
            team1_score = document.querySelectorAll(".team__home__info__score"),
            team2_score = document.querySelectorAll(".team__away__info__score"),
            /* Matches */
            matchesBtns = document.querySelectorAll(".match__item__form button");

        socket.on("dbupdate", function(json) {
            var data = JSON.parse(json);

            var updateScore1 = data.team_1_score,
                updateScore2 = data.team_2_score;

            if (data.game_id == gameID)
                replaceScores(updateScore1, updateScore2);
        });

        socket.on('redirect', function(destination) {
            if (destination)
                window.location.href = destination
            else
                location.reload();
        });

        // If JS is enabled, fire these functions to add enhanced functionality
        hideInputs();
        scoreButtonListeners();

        if (!document.querySelector("#user_id")) {
            if (document.querySelector("#submit")) {
                hideFormSubmit();
            }
            hideCheckBoxes();
        }

        // Update scores
        function replaceScores(score1, score2) {
            team1_score[0].value = score1;
            team2_score[0].value = score2;
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
                        setTimeout(function() {
                            button.classList.remove("pop--active");
                        }, 1000)
                    };
                }(button), false);
            });
        }

        // Hide inputs when JS is disabled
        function hideInputs() {
            [].forEach.call(team1_score, function(input) {
                input.setAttribute("readonly", "");
            });

            [].forEach.call(team2_score, function(input) {
                input.setAttribute("readonly", "");
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
              score1 = document.querySelector('.team__home__info__score'),
              score2 = document.querySelector('.team__away__info__score'),
              gameID = window.location.pathname.split('/')[2],
              isFinal = false,
              scoreBtn = true,
              userID = null;

            if (document.querySelector("#user_id"))
                userID = document.querySelector("#user_id").value;

            if (buttonId === "team__home__minus") {
                var score1HTML = score1.value;
                var score2 = Number(score2.value);
                var newScore = Number(score1HTML) - 1;

                if(newScore < 1) {
                  newScore = 0;
                }
                //score1.value = newScore;

                //score1.innerHTML = newScore;

                if(activeProgress == true) {
                  var queue_score_1 = document.querySelector('#queue_score_1').innerHTML;
                  var queue_score_2 = document.querySelector('#queue_score_2').innerHTML;

                  var newQueueScore = Number(queue_score_1) - 1;

                  if(newQueueScore < 1) {
                    newQueueScore = 0;
                  }

                  moveBar(newQueueScore, queue_score_2);

                } else {
                    moveBar(newScore, score2);
                }

            } else if (buttonId === "team__away__minus") {
                var score2HTML = score2.value;
                var score1 = Number(score1.value);
                var newScore = Number(score2HTML) - 1;
                //score2.innerHTML = newScore;

                if(newScore < 1) {
                  newScore = 0;
                }

                if(activeProgress == true) {
                  var queue_score_1 = document.querySelector('#queue_score_1').innerHTML;
                  var queue_score_2 = document.querySelector('#queue_score_2').innerHTML;

                  var newQueueScore = Number(queue_score_2) - 1;

                  if(newQueueScore < 1) {
                    newQueueScore = 0;
                  }

                  moveBar(queue_score_1, newQueueScore);

                } else {
                    moveBar(score1, newScore);
                }

            } else if (buttonId === "team__home__plus") {
                var score1HTML = score1.value;
                var score2 = Number(score2.value);
                var newScore = Number(score1HTML) + 1;
                //score1.innerHTML = newScore;

                if(newScore < 1) {
                  newScore = 0;
                }

                if(activeProgress == true) {
                  var queue_score_1 = document.querySelector('#queue_score_1').innerHTML;
                  var queue_score_2 = document.querySelector('#queue_score_2').innerHTML;

                  var newQueueScore = Number(queue_score_1) + 1;

                  if(newQueueScore < 1) {
                    newQueueScore = 0;
                  }

                  moveBar(newQueueScore, queue_score_2);

                } else {
                    moveBar(newScore, score2);
                }

            } else if (buttonId === "team__away__plus") {
                var score2HTML = score2.value;
                var score1 = Number(score1.value);
                var newScore = Number(score2HTML) + 1;
                //score2.value = newScore;

                if(newScore < 1) {
                  newScore = 0;
                }

                if(activeProgress == true) {
                  var queue_score_1 = document.querySelector('#queue_score_1').innerHTML;
                  var queue_score_2 = document.querySelector('#queue_score_2').innerHTML;

                  var newQueueScore = Number(queue_score_2) + 1;

                  if(newQueueScore < 1) {
                    newQueueScore = 0;
                  }

                  moveBar(queue_score_1, newQueueScore);

                } else {
                    moveBar(score1, newScore);
                }
            }
        }

        function moveBar(score1, score2) {

          // Get needed elements
          var progressElem = document.getElementById("progress"),
              progressBar = document.getElementById("progressBar"),
              label = document.getElementById("label-progress"),
              messageLabel = document.getElementById("messageLabel"),
              cancelButton = document.querySelector(".cancelScore"),
              old_score1 = document.querySelector('.match__item__team__home .match__item__team__info__score'),
              old_score2 = document.querySelector('.match__item__team__away .match__item__team__info__score'),
              queue_score_1 = document.querySelector('#queue_score_1'),
              queue_score_2 = document.querySelector('#queue_score_2'),
              gameID = window.location.pathname.split('/')[2],
              isFinal = false,
              scoreBtn = true,
              userID = null;

              window.clearTimeout(timer);
              timer = window.setTimeout(load, 8000);

              cancelButton.addEventListener('click', function(index) {
                  return function(e) {
                      e.preventDefault();

                      window.clearTimeout(timer);
                      hideElem(progressElem);
                      activeProgress = false;
                  };
              }(cancelButton), false);


              // Hide progress bar
              hideElem(progressElem);

              window.setTimeout(function() {
                // Show progress bar
                showElem(progressElem);
              }, 50);

              activeProgress = true;

              messageLabel.innerHTML = "Score updated to: ";
              queue_score_1.innerHTML = score1;
              queue_score_2.innerHTML = score2;

              function load() {
                // Add scores to database
                addScore(score1, score2, gameID, isFinal, userID, scoreBtn);
                // Hide progress bar
                hideElem(progressElem);
                // Set active to false
                activeProgress = false;
              }
        }

        // If submitted by scorekeeper
        if (submit != null) {
            submit.addEventListener("click", function(e) {
                e.preventDefault();
                var score1 = document.querySelector(".match__item__team__home .match__item__team__info__score").value,
                    score2 = document.querySelector(".match__item__team__away .match__item__team__info__score").value,
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

    }

    function changeHomeScores() {
        socket.on("dbupdate", function(json) {
            var data = JSON.parse(json);

            // Get new scores
            var updateScoreHome1 = data.team_1_score,
                updateScoreHome2 = data.team_2_score,
                // Get article with match id
                target = document.getElementById("match-" + data.game_id),
                tdTeam1 = target.getElementsByClassName("team_1_score_realtime")[0],
                tdTeam2 = target.getElementsByClassName("team_2_score_realtime")[0];

            // Assign to html
            tdTeam1.value = updateScoreHome1;
            tdTeam2.value = updateScoreHome2;
        });
    }

    function showElem(el) {
      el.classList.remove("hidden");
      el.classList.add("is-visible");
    }

    function hideElem(el) {
      el.classList.remove("is-visible");
      el.classList.add("hidden");
    }

    function matchesInit() {

        var btns = document.querySelectorAll(".matches__item__morph__container button");

        scoreButtonListeners();

        socket.on("dbupdate", function(json) {
            var data = JSON.parse(json);

            console.log(data);

            // Get new scores
            var updateScoreHome1 = data.team_1_score,
                updateScoreHome2 = data.team_2_score,
                // Get article with match id
                target = document.getElementById("match-" + data.game_id),
                tdTeam1 = target.getElementsByClassName("team_1_score_realtime")[0],
                tdTeam2 = target.getElementsByClassName("team_2_score_realtime")[0];

            // Assign to html
            tdTeam1.innerHTML = updateScoreHome1;
            tdTeam2.innerHTML = updateScoreHome2;
        });

        // Add plus and minus button click events
        function scoreButtonListeners() {
            [].forEach.call(btns, function(button) {
                button.addEventListener('click', function(index) {
                    return function(e) {
                        e.preventDefault();
                        changeScore(index);
                        button.classList.add("pop--active");
                        setTimeout(function() {
                            button.classList.remove("pop--active");
                        }, 1000)
                    };
                }(button), false);
            });
        }

        // Fire real time event to socket
        function changeScore(item) {
            var buttonId = item.id,
                gameID = item.getAttribute("data-id"),
                article = document.querySelector('#match-' + gameID),
                score1 = article.querySelector('.team_1_score_realtime'),
                score2 = article.querySelector('.team_2_score_realtime'),
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

                    if(newScore < 1) {
                      newScore = 0;
                    }

                    if(activeProgress == true) {
                      var queue_score_1 = article.querySelector('.queue_score_1').innerHTML;
                      var queue_score_2 = article.querySelector('.queue_score_2').innerHTML;

                      var newQueueScore = Number(queue_score_1) - 1;

                      if(newQueueScore < 1) {
                        newQueueScore = 0;
                      }

                      moveBarMatches(newQueueScore, queue_score_2, gameID);

                    } else {
                        moveBarMatches(newScore, score2, gameID);
                    }

                } else if (buttonId === "team__away__minus") {
                    var score2HTML = score2.innerHTML;
                    var score1 = Number(score1.innerHTML);
                    var newScore = Number(score2HTML) - 1;
                    //score2.innerHTML = newScore;

                    if(newScore < 1) {
                      newScore = 0;
                    }

                    if(activeProgress == true) {
                      var queue_score_1 = article.querySelector('.queue_score_1').innerHTML;
                      var queue_score_2 = article.querySelector('.queue_score_2').innerHTML;

                      var newQueueScore = Number(queue_score_2) - 1;

                      if(newQueueScore < 1) {
                        newQueueScore = 0;
                      }

                      moveBarMatches(queue_score_1, newQueueScore, gameID);

                    } else {
                        moveBarMatches(score1, newScore, gameID);
                    }

                } else if (buttonId === "team__home__plus") {
                    var score1HTML = score1.innerHTML;
                    var score2 = Number(score2.innerHTML);
                    var newScore = Number(score1HTML) + 1;
                    //score1.innerHTML = newScore;

                    if(newScore < 1) {
                      newScore = 0;
                    }

                    if(activeProgress == true) {
                      var queue_score_1 = article.querySelector('.queue_score_1').innerHTML;
                      var queue_score_2 = article.querySelector('.queue_score_2').innerHTML;

                      var newQueueScore = Number(queue_score_1) + 1;

                      if(newQueueScore < 1) {
                        newQueueScore = 0;
                      }

                      moveBarMatches(newQueueScore, queue_score_2, gameID);

                    } else {
                        moveBarMatches(newScore, score2, gameID);
                    }

                } else if (buttonId === "team__away__plus") {
                    var score2HTML = score2.innerHTML;
                    var score1 = Number(score1.innerHTML);
                    var newScore = Number(score2HTML) + 1;
                    //score2.innerHTML = newScore;

                    if(newScore < 1) {
                      newScore = 0;
                    }

                    if(activeProgress == true) {
                      var queue_score_1 = article.querySelector('.queue_score_1').innerHTML;
                      var queue_score_2 = article.querySelector('.queue_score_2').innerHTML;

                      var newQueueScore = Number(queue_score_2) + 1;

                      if(newQueueScore < 1) {
                        newQueueScore = 0;
                      }

                      moveBarMatches(queue_score_1, newQueueScore, gameID);

                    } else {
                        moveBarMatches(score1, newScore, gameID);
                    }
                }
        }

        function moveBarMatches(score1, score2, gameID) {

          // Get needed elements
          var article = document.querySelector('#match-' + gameID),
              progressElem = article.querySelector(".progress"),
              queue_score_1 = article.querySelector('.queue_score_1'),
              queue_score_2 = article.querySelector('.queue_score_2'),
              cancelButton = article.querySelector(".cancelScoreMatches"),
              moreInfo = article.querySelector(".more__info"),
              isFinal = false,
              scoreBtn = true,
              userID = null;

              window.clearTimeout(timer);
              timer = window.setTimeout(load, 8000);


              cancelButton.classList.remove("hidden");
              cancelButton.classList.add("is-visible");

              moreInfo.classList.remove("is-visible");
              moreInfo.classList.add("hidden");


              cancelButton.addEventListener('click', function(index) {
                  return function(e) {
                      e.preventDefault();

                      window.clearTimeout(timer);
                      hideElem(progressElem);
                      activeProgress = false;

                      // Hide progress bar
                      queue_score_1.classList.remove("is-visible");
                      queue_score_1.classList.add("hidden");
                      queue_score_2.classList.remove("is-visible");
                      queue_score_2.classList.add("hidden");

                      this.classList.remove("is-visible");
                      this.classList.add("hidden");

                      moreInfo.classList.remove("hidden");
                      moreInfo.classList.add("is-visible");

                  };
              }(cancelButton), false);

              // Hide progress bar
              hideElem(progressElem);

              window.setTimeout(function() {
                // Show progress bar
                showElem(progressElem);
              }, 50);

              activeProgress = true;

              queue_score_1.innerHTML = score1;
              queue_score_2.innerHTML = score2;

              queue_score_1.classList.remove("hidden");
              queue_score_1.classList.add("is-visible");

              queue_score_2.classList.remove("hidden");
              queue_score_2.classList.add("is-visible");

              function load() {
                // Add scores to database
                addScore(score1, score2, gameID, isFinal, userID, scoreBtn);
                // Hide progress bar
                queue_score_1.classList.remove("is-visible");
                queue_score_1.classList.add("hidden");
                queue_score_2.classList.remove("is-visible");
                queue_score_2.classList.add("hidden");

                cancelButton.classList.remove("is-visible");
                cancelButton.classList.add("hidden");

                moreInfo.classList.remove("hidden");
                moreInfo.classList.add("is-visible");

                hideElem(progressElem);
                // Set active to false
                activeProgress = false;
              }
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

    }

    // Return functions
    return {
        matchInit: matchInit,
        changeHomeScores: changeHomeScores,
        matchesInit: matchesInit
    };

})();
