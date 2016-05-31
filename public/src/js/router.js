/*********************************************************
	ROUTER MODULE [with router lib: Routie]
*********************************************************/
UFA.router = ( () => {
    function init () {
        if (!window.location.hash) {
            window.location = '/#matches/live';
        }
        routie({
            'matches/live': function() {
                UFA.page.matchesLive();
            }
        });
    }

    return {
        init: init
    };

})();
