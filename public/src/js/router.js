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
                UFA.page.matchesRecent();
            },
            'matches/live': function() {
                UFA.page.matchesLive();
            },
            'matches/upcoming': function() {
                UFA.page.matchesUpcoming();
            }

        });
    }

    return {
        init: init
    };

})();
