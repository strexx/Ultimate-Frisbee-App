/*********************************************************
	ROUTER MODULE [with router lib: Routie]
*********************************************************/
UFA.router = ( () => {
    function init () {
        routie({
            'matches/recent': function() {
                UFA.ux.showLoader();
                UFA.page.matchesRecent();
            },
            'matches/live': function() {
                UFA.ux.showLoader();
                UFA.page.matchesLive();
            },
            'matches/upcoming': function() {
                UFA.ux.showLoader();
                UFA.page.matchesUpcoming();
            },
            'tournaments': function() {
                UFA.ux.showLoader();
                UFA.page.tournaments();
            },
            'match/:ID': function(ID) {
                UFA.ux.showLoader();
                UFA.page.match(ID);
            }
        });
    }

    return {
        init: init
    };

})();
