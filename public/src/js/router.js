/*********************************************************
	ROUTER MODULE
*********************************************************/
UFA.router = (() => {
    function init() {
        UFA.ux.toggleMenu();
        if (window.location.pathname == '/') {
            UFA.ux.toggleClass(window.location.hash);
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
                    var gameID = window.location.pathname.split('/')[2];
                    UFA.page.matchInfo(gameID);
                    break;
                case "#scores":
                    var gameID = window.location.pathname.split('/')[2];
                    UFA.page.matchScores(gameID);
                    break;
                case "#location":
                    var gameID = window.location.pathname.split('/')[2];
                    UFA.page.matchLocation(gameID);
                    break;
            }
        });
    }

    return {
        init: init
    };

})();
