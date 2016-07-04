/*********************************************************
	ROUTER MODULE
*********************************************************/
UFA.router = (() => {
    function init() {
        UFA.ux.toggleMenu();

        var ID = window.location.pathname.split('/')[2];

        if (window.location.pathname == '/') {
            UFA.page.matchesLive();
            //UFA.sw.init();
            console.log("Matches");
        } else if (window.location.pathname == '/login/') {
            UFA.page.login();
            console.log("Login");
        } else if (window.location.pathname == '/tournaments/') {
            UFA.page.tournaments();
            console.log("Tournaments");
        } else if (window.location.pathname == '/match/' + ID + '/') {
            UFA.page.matchScores();
            console.log("Scores");
        } else if (window.location.pathname == '/tournament/' + ID + '/') {
            UFA.page.tournamentMatches();
            console.log("Tournament");
        } else if (window.location.pathname == '/favorites/') {
            UFA.page.favorites();
            console.log("Favorites");
        }

        // Check if hash has changed and toggle actives on links
        window.addEventListener("hashchange", function() {
            switch (window.location.hash) {
                case "#recent":
                    UFA.page.matchesRecent();
                    break;
                case "#live":
                    UFA.page.matchesLive();
                    break;
                case "#upcoming":
                    UFA.page.matchesUpcoming();
                    break;
                case "#info":
                    UFA.page.matchInfo();
                    break;
                case "#scores":
                    UFA.page.matchScores();
                    break;
                case "#location":
                    UFA.page.matchLocation();
                    break;
                case "#matches":
                    UFA.page.tournamentMatches();
                    break;
                case "#rounds":
                    UFA.page.tournamentRounds();
                    break;
                case "#ranking":
                    UFA.page.tournamentRanking();
                    break;
            }
        });
    }

    return {
        init: init
    };

})();
