/*********************************************************
	DATA REQUEST
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
        splashScreen = document.querySelector(".splash");


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
            var link = document.querySelector(hash+'-menu'),
                fullLink = link.childNodes[0].getAttribute("href");
            link.classList.add('active');
        } else {
            document.querySelector('#live').classList.add('active');
        }
    }

    function toggleSection() {
        var links = Array.prototype.slice.call(document.querySelectorAll('nav li')),
            hash = window.location.hash;
            console.log(hash);

          var sections = document.querySelectorAll('main > section');
          var i;

          console.log(sections);

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

    function toggleMenuClass () {
      mainNavLi.forEach(function(item) {
        item.classList.remove('active');
      })
    }

    function showLoader() {
        loader.classList.add("active");
    }

    function hideLoader() {
        loader.classList.remove("active");
    }


    function toggleSplash () {
      splashScreen.classList.add('active');
      setTimeout(function () {
        splashScreen.classList.remove('active');
      }, 4000)
    }

    return {
        toggleClass: toggleClass,
        showLoader: showLoader,
        hideLoader: hideLoader,
        toggleSplash: toggleSplash,
        toggleSection: toggleSection,
        toggleMenuClass: toggleMenuClass
    };

})();
