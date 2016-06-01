/*********************************************************
	DATA REQUEST
*********************************************************/
UFA.ux = ( () => {

    var loader  = document.querySelector(".loader");
    var tabLinks = document.getElementsByClassName("tablinks");


    function init() {

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
        toggleClass: toggleClass
    };

})();
