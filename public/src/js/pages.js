/*********************************************************
	PAGE MODULE [with Promise]
*********************************************************/
UFA.page = (() => {

    function matchesRecent() {
        UFA.scores.matchesInit();
        UFA.ux.toggleClass();
        UFA.ux.toggleDropdown();
    }

    function matchesLive() {
        UFA.scores.matchesInit();
        UFA.scores.changeHomeScores();
        UFA.ux.splashVisited();
        UFA.ux.toggleClass();
        UFA.ux.toggleDropdown();
    }

    function matchesUpcoming() {
        UFA.scores.matchesInit();
        UFA.ux.toggleClass();
        UFA.ux.toggleDropdown();
    }

    function matchInfo() {
        UFA.ux.toggleClass();
    }

    function matchScores() {
        UFA.scores.matchInit();
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
        // UFA.ux.toggleDropdown();
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
