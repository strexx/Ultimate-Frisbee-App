/*********************************************************
	PAGE MODULE [with Promise]
*********************************************************/
UFA.page = (() => {

    var wrapperSelector = document.querySelector('#wrapper');

    function request(method, url) { // src: http://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr
        return new Promise(function(resolve, reject) {
            UFA.ux.showLoader();
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function() {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                    UFA.ux.hideLoader();
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                    UFA.ux.hideLoader();
                }
            };
            xhr.onerror = function() {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }

    function matchesRecent() {
        UFA.ux.toggleSection();
        UFA.ux.toggleClass();
    }

    function matchesLive() {
        UFA.ux.toggleSection();
        UFA.ux.toggleClass();
        UFA.ux.splashVisited();
        UFA.ux.toggleMenuClassHome();
    }

    function matchesUpcoming() {
        UFA.ux.toggleSection();
        UFA.ux.toggleClass();
    }

    function matchInfo() {
        UFA.ux.toggleSection();
        UFA.ux.toggleClass();
    }

    function matchScores() {
        UFA.scores.init();
        UFA.ux.toggleSection();
        UFA.ux.toggleClass();
    }

    function matchLocation() {
        UFA.ux.toggleSection();
        UFA.ux.toggleClass();
    }

    function tournaments() {
        UFA.ux.toggleMenuClassTournaments();
    }

    function tournamentMatches() {
        UFA.ux.toggleSection();
        UFA.ux.toggleClass();
    }

    function tournamentRounds() {
        UFA.ux.toggleSection();
        UFA.ux.toggleClass();
    }

    function tournamentRanking() {
        UFA.ux.toggleSection();
        UFA.ux.toggleClass();
    }

    function login() {
        UFA.ux.loginSubmitListener();
        UFA.ux.toggleMenuClassLogin();
    }

    return {
        request: request,
        matchesRecent: matchesRecent,
        matchesLive: matchesLive,
        matchesUpcoming: matchesUpcoming,
        matchInfo: matchInfo,
        matchScores: matchScores,
        matchLocation: matchLocation,
        tournaments: tournaments,
        tournamentMatches: tournamentMatches,
        tournamentRounds: tournamentRounds,
        tournamentRanking: tournamentRanking,
        login: login
    };

})();
