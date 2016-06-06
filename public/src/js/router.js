/*********************************************************
	ROUTER MODULE [with router lib: Routie]
*********************************************************/
UFA.router = (() => {
    function init() {
        if (window.location.pathname == '/') {
            UFA.ux.toggleClass(window.location.hash);
        }
        // Check if hash has changed and toggle actives on links
        window.addEventListener("hashchange", function() {
            switch (window.location.hash) {
                case "#matches/recent":
                    UFA.page.matchesRecent();
                    break;
                case "#matches/live":
                    UFA.page.matchesLive();
                    break;
                case "#matches/upcoming":
                    UFA.page.matchesUpcoming();
                    break;
            }
        });
    }

    return {
        init: init
    };

})();
