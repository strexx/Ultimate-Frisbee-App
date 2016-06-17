/*********************************************************
	UX & BEHAVIOUR
*********************************************************/
UFA.ux = (() => {

    // Global vars
    var loader = document.querySelector('.loader'),
        tabLinks = document.getElementsByClassName('tablinks'),
        body = document.querySelector('body'),
        wrapperBody = document.querySelector('#wrapper'),
        navHome = document.querySelector('#nav-home'),
        navTournaments = document.querySelector('#nav-tournaments'),
        navLogin = document.querySelector('#nav-login'),
        mainNavLi = document.querySelectorAll(".main-nav-li"),
        splashScreen = document.querySelector(".splash"),
        loginSubmitBtn = document.querySelector('.login_submit'),
        placeholder = document.querySelector('.login_submit i'),
        feedback = document.querySelector('.feedback');

    function toggleClass() {
        // Get all menu items
        var links = Array.prototype.slice.call(document.querySelectorAll('#section-nav li')),
            hash = window.location.hash;

        // Remove active class
        links.forEach(function(item) {
            item.classList.remove("active");
        });

        // Add active class to new hash
        if (hash != "") {
            var link = document.querySelector(hash + '-menu'),
                fullLink = link.childNodes[0].getAttribute("href");
            link.classList.add('active');
        } else {
            //document.querySelector('#live').classList.add('active');
            links[1].classList.add('active');
        }
    }

    function toggleSection() {
        var links = Array.prototype.slice.call(document.querySelectorAll('nav li')),
            hash = window.location.hash,
            sections = document.querySelectorAll('main > section'),
            i;

        for (i = 0; i < sections.length; i++) {
            sections[i].classList.add('inactive');

            if (!hash) {
                sections[0].classList.remove('inactive');
            }

        }
        if (hash) {
            document.querySelector(hash + "-block").classList.remove('inactive');
        }

    }

    function toggleMenuClassHome() {
        navHome.classList.add('active');
    }

    function toggleMenuClassTournaments() {
        navTournaments.classList.add('active');
    }

    function toggleMenuClassLogin() {
        navLogin.classList.add('active');
    }

    function showLoader() {
        loader.classList.add("active");
    }

    function hideLoader() {
        loader.classList.remove("active");
    }

    function splashVisited() {
        var splashShown = localStorage.getItem("splashShown");
        if (!splashShown) {
            toggleSplash();
            localStorage.setItem("splashShown", "true");
        }
    }

    function toggleSplash() {
        splashScreen.classList.add('active');
        setTimeout(function() {
            splashScreen.classList.remove('active');
        }, 4000)
    }

    // Login
    function loginSubmitListener() {
        loginSubmitBtn.addEventListener("click", loginSubmit, false);
    }

    function loginSubmit(e) {
        placeholder.classList.remove("fa-long-arrow-right");
        placeholder.classList.add("fa-check");
        feedback.classList.remove("errorMsg");
        feedback.classList.add("is-visible");
    }

    return {
        toggleClass: toggleClass,
        showLoader: showLoader,
        hideLoader: hideLoader,
        splashVisited: splashVisited,
        toggleSection: toggleSection,
        toggleMenuClassHome: toggleMenuClassHome,
        toggleMenuClassTournaments: toggleMenuClassTournaments,
        toggleMenuClassLogin: toggleMenuClassLogin,
        loginSubmitListener: loginSubmitListener
    };

})();
