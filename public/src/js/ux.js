/*********************************************************
	DATA REQUEST
*********************************************************/
UFA.ux = (() => {

    var loader = document.querySelector('.loader');
    var tabLinks = document.getElementsByClassName('tablinks');

    function toggleMenu() {

        var toggleInfo = document.querySelector('.toggleinfo'),
            closeButton = document.querySelector('.closebutton'),
            closeIcon = document.querySelector('.close-icon'),
            menu = document.querySelector('#menu'),
            body = document.querySelector('body'),
            wrapperBody = document.querySelector('#wrapper');

        toggleInfo.addEventListener('click', function() {
            animateSidebar();
        });

        function animateSidebar() {
            wrapperBody.classList.toggle('slideright');
            closeIcon.classList.toggle('rotateicon');
        }

    }

    function showLoader() {
        loader.classList.add("active");
    }

    function hideLoader() {
        loader.classList.remove("active");
    }

    function toggleClass(fullHash) {

        // Get all menu items

        var links = Array.prototype.slice.call(document.querySelectorAll('nav li')),
            hash = window.location.hash.substring(1).split('/');

        // Remove active class
        links.forEach(function(item) {
            item.classList.remove("active");
        });

        // Add active class to new hash
        if (hash != "") {
            var link = document.querySelector('#' + hash[1]),
                fullLink = link.childNodes[0].getAttribute("href");
            link.classList.add('active');
        } else {
            document.querySelector('#live').classList.add('active');
        }

        // Run functions when hash is changed
        switch (fullHash) {
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
    }
    
    return {
        showLoader: showLoader,
        hideLoader: hideLoader,
        toggleClass: toggleClass,
        toggleMenu: toggleMenu
    };

})();
