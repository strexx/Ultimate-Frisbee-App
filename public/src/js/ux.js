/*********************************************************
	DATA REQUEST
*********************************************************/
UFA.ux = (() => {

    // Global vars
    var loader = document.querySelector('.loader'),
        tabLinks = document.getElementsByClassName('tablinks'),
        menu = document.querySelector('#menu'),
        menuIcon = document.querySelector('.menu-icon'),
        body = document.querySelector('body'),
        wrapperBody = document.querySelector('#wrapper'),
        menuWrapper = document.querySelector('.menu-wrapper');

    function toggleMenu() {
        menuIcon.addEventListener('click', function() {
            animateSidebar();
        });

        function animateSidebar() {
            wrapperBody.classList.toggle('content-slideright');
            menuWrapper.classList.toggle('menu-wrapperslide');
            menuIcon.classList.toggle('active');
        };

        // return {
        //     wrapperBody: wrapperBody,
        //     menuWrapper: menuWrapper,
        //     closeIcon: closeIcon
        // };

    }

    function toggleClass() {
        // Get all menu items
        var links = Array.prototype.slice.call(document.querySelectorAll('nav li')),
            hash = window.location.hash;

        // Remove active class
        links.forEach(function(item) {
            item.classList.remove("active");
        });

        // Add active class to new hash
        if (hash != "") {
            var link = document.querySelector(hash),
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

          var sections = document.querySelectorAll('.match_items');
          var i;

          console.log(sections);

          for (i = 0; i < sections.length; i++) {
              sections[i].classList.add('inactive');

              if (!hash) {
                  sections[0].classList.remove('inactive');
                  console.log('inohash');
              }

          }
          if (hash) {
              document.querySelector(hash + "_sect").classList.remove('inactive');
          }

    }


    function showLoader() {
        loader.classList.add("active");
    }

    function hideLoader() {
        loader.classList.remove("active");
    }

    return {
        toggleMenu: toggleMenu,
        toggleClass: toggleClass,
        showLoader: showLoader,
        hideLoader: hideLoader,
        toggleSection: toggleSection
    };

})();
