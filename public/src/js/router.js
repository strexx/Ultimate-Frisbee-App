/*********************************************************
	ROUTER MODULE [with router lib: Routie]
*********************************************************/
UFA.router = ( () => {
    function init () {

      // Check router on init
      switch(window.location.hash) {
        case "":
            UFA.ux.showLoader();
            UFA.page.matchesLive();
            break;
        case "#matches/recent":
            UFA.ux.showLoader();
            UFA.page.matchesRecent();
            break;
        case "#matches/live":
            UFA.ux.showLoader();
            UFA.page.matchesLive();
            break;
        case "#matches/upcoming":
            UFA.ux.showLoader();
            UFA.page.matchesUpcoming();
            break;
      }

      // Check if hash has changed and toggle actives on links
      window.addEventListener("hashchange", function () {
          UFA.ux.toggleClass(window.location.hash);
      });

    }

    return {
        init: init
    };

})();
