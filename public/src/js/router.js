/*********************************************************
	ROUTER MODULE
*********************************************************/
UFA.router = (() => {
    function init() {
        var gameID = window.location.pathname.split('/')[2],
        navHome = document.querySelector('#nav-home'),
        navTournaments = document.querySelector('#nav-tournaments'),
        navLogin = document.querySelector('.navlog'),
        mainNavLi = document.querySelectorAll(".main-nav-li");

        if (window.location.pathname == '/') {
            UFA.ux.toggleSection();
            UFA.ux.toggleMenuClass();
            UFA.ux.toggleSplash();

            navHome.classList.add('active');
          } else if (window.location.pathname == '/login') {
            UFA.login.init();
            UFA.ux.toggleMenuClass();

            navLogin.classList.add('active');

        } else if (window.location.pathname == '/tournaments') {
          UFA.ux.toggleMenuClass();

          navTournaments.classList.add('active');

        } else if (window.location.pathname.indexOf('match/'+gameID)) {
            UFA.data.socket();
            UFA.ux.toggleSection();
            UFA.ux.toggleMenuClass();
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
    }

    return {
        init: init
    };

})();
