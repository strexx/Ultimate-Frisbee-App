/*********************************************************
	DATA REQUEST
*********************************************************/
UFA.ux = ( () => {

    var loader  = document.querySelector(".loader");

    function init() {

    }

    function showLoader() {
      loader.classList.add("is-visible");
    }

    function hideLoader() {
      loader.classList.add("hidden");
    }

    return {
        init: init,
        showLoader: showLoader,
        hideLoader: hideLoader
    };

})();
