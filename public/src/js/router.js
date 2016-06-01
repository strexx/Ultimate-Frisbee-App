/*********************************************************
	ROUTER MODULE [with router lib: Routie]
*********************************************************/
UFA.router = ( () => {
    function init () {
        if (!window.location.hash) {
            window.location = '/#matches/live';
        }
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
            'match': function() {
                UFA.ux.showLoader();
                UFA.page.match();
            }
        });
    }

    return {
        init: init
    };

})();
