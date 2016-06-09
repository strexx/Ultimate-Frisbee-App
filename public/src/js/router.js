/*********************************************************
	ROUTER MODULE
*********************************************************/
UFA.router = (() => {
    function init() {
        var gameID = window.location.pathname.split('/')[2];
        if (window.location.pathname == '/') {
            UFA.ux.toggleSection();
        } else if (window.location.pathname.indexOf('match/'+gameID)) {
            UFA.data.socket();
            UFA.ux.toggleSection();
        } else if (window.location.pathname.indexOf('login')) {
            UFA.login.init();
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
                    UFA.page.matchScores(gameID);
                    break;
                case "#location":
                    UFA.page.matchLocation();
                    break;
            }
        });
        UFA.ux.toggleMenu();
    }

    return {
        init: init
    };

})();
