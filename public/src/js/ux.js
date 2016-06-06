/*********************************************************
	DATA REQUEST
*********************************************************/
UFA.ux = (() => {

    var loader = document.querySelector('.loader');
    var tabLinks = document.getElementsByClassName('tablinks');




    function init() {

    }

    function toggleMenu() {

      var toggleInfo = document.querySelector('.toggleinfo'),
          closeIcon = document.querySelector('.close-icon'),
          menu = document.querySelector('#menu'),
          body = document.querySelector('body'),
          wrapperBody = document.querySelector('#wrapper'),
          menuWrapper = document.querySelector('.menu-wrapper')


        function animateSidebar() {
            wrapperBody.classList.toggle('content-slideright');
            menuWrapper.classList.toggle('menu-wrapperslide');
            closeIcon.classList.toggle('rotateicon');
        };


        toggleInfo.addEventListener('click', function() {
            console.log('hoi');
            animateSidebar();
        });
    }

    function showLoader() {
        loader.classList.add("active");
    }

    function hideLoader() {
        loader.classList.remove("active");
    }

    function toggleClass() {

        // Get all menu items

        var links = Array.prototype.slice.call(document.querySelectorAll('nav li')),
            hash = window.location.hash.substring(1).split('/'),
            link = document.querySelector('#' + hash[1]);

        // Remove active class
        links.forEach(function(item) {
            item.classList.remove("active");
        });

        // Add active class to new hash
        link.classList.add('active');
    }


    return {
        init: init,
        showLoader: showLoader,
        hideLoader: hideLoader,
        toggleClass: toggleClass,
        toggleMenu: toggleMenu
    };

})();
