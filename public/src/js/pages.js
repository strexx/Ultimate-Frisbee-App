/*********************************************************
	PAGE MODULE [with Promise]
*********************************************************/
UFA.page = (() => {

    function matchesRecent() {
        UFA.ux.toggleClass();
        UFA.ux.toggleDropdown();
    }

    function matchesLive() {
        UFA.scores.changeHomeScores();
        UFA.ux.splashVisited();
        UFA.ux.toggleClass();
        UFA.ux.toggleDropdown();
    }

    function matchesUpcoming() {
        UFA.ux.toggleClass();
        UFA.ux.toggleDropdown();
    }

    function matchInfo() {
        UFA.ux.toggleClass();
    }

    function matchScores() {
        UFA.scores.init();
        UFA.ux.toggleClass();
    }

    function matchLocation() {
        UFA.ux.toggleClass();
    }

    function tournaments() {
    }

    function tournamentMatches() {
        UFA.ux.toggleClass();
    }

    function tournamentRounds() {
        UFA.ux.toggleClass();
    }

    function tournamentRanking() {
        UFA.ux.toggleClass();
    }

    function login() {
        UFA.ux.loginSubmit();
    }

    function favorites () {

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
        login: login,
        favorites: favorites
    };

})();
