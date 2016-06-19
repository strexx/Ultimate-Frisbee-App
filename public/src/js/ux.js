/*********************************************************
	UX & BEHAVIOUR
*********************************************************/
UFA.ux = (() => {

    // global vars
    var loader = document.querySelector('#loader'),
        splashScreen = document.querySelector("#splash"),
        loginSubmitBtn = document.querySelector('.login_submit'),
        placeholder = document.querySelector('.login_submit i'),
        feedback = document.querySelector('.feedback');

    // toggle tabs + section
    function toggleClass() {
        // Get all menu items
        var links = Array.prototype.slice.call(document.querySelectorAll('.header__tab__link')),
            hash = window.location.hash;

        // Remove active class
        links.forEach(function(link) {
            link.classList.remove("header__tab__link--active");
        });

        // Add active class to new hash
        if (hash !== "") {
            var hashName = hash.substr(1)
            var link = document.querySelector('.header__tab__list__'+hashName+ ' .header__tab__link');
            link.classList.add('header__tab__link--active');
        } else {
            links[1].classList.add('header__tab__link--active');
        }

        toggleSection();
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
                sections[0].classList.add('active');
            }

        }
        if (hash) {
            document.querySelector(hash).classList.remove('inactive');
            document.querySelector(hash).classList.add('active');
        }

    }

    // loaders
    function showLoader() {
        loader.classList.add("active");
    }

    function hideLoader() {
        loader.classList.remove("active");
    }

    function splashVisited() {
        var splashShown = localStorage.getItem("splashShown");
        if (!splashShown) {
            showSplash();
            localStorage.setItem("splashShown", "true");
        }
    }

    // splash screen
    function showSplash() {
        splashScreen.classList.add('active');
        setTimeout(function() {
            splashScreen.classList.remove('active');
        }, 4000)
    }

    // login
    function loginSubmit() {
        loginSubmitBtn.addEventListener("click", loginSubmitAction, false);

        function loginSubmitAction(e) {
            placeholder.classList.remove("fa-long-arrow-right");
            placeholder.classList.add("fa-check");
            feedback.classList.remove("errorMsg");
            feedback.classList.add("is-visible");
        }
    }

    return {
        toggleClass: toggleClass,
        toggleSection: toggleSection,
        showLoader: showLoader,
        hideLoader: hideLoader,
        splashVisited: splashVisited,
        loginSubmit: loginSubmit
    };

})();
