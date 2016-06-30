/*********************************************************
	PAGE MODULE [with Promise]
*********************************************************/
UFA.page = (() => {

    function matchesRecent() {
        UFA.ux.toggleClass();
        UFA.ux.toggleMenu();
    }

    function matchesLive() {
        UFA.scores.changeHomeScores();
        UFA.ux.splashVisited();
        UFA.ux.toggleClass();
        UFA.ux.toggleMenu();
    }

    function matchesUpcoming() {
        UFA.ux.toggleClass();
        UFA.ux.toggleMenu();
    }

    function matchInfo() {
        UFA.ux.toggleClass();
        UFA.ux.toggleMenu();
    }

    function matchScores() {
        UFA.scores.init();
        UFA.ux.toggleClass();
        UFA.ux.toggleMenu();
    }

    function matchLocation() {
        UFA.ux.toggleClass();
        UFA.ux.toggleMenu();
    }

    function tournaments() {

    }

    function tournamentMatches() {
        UFA.ux.toggleClass();
        UFA.ux.toggleMenu();
    }

    function tournamentRounds() {
        UFA.ux.toggleClass();
        UFA.ux.toggleMenu();
    }

    function tournamentRanking() {
        UFA.ux.toggleClass();
        UFA.ux.toggleMenu();
    }

    function login() {
        UFA.ux.loginSubmit();
        UFA.ux.toggleMenu();
    }

    return {
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
