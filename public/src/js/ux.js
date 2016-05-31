/*********************************************************
	DATA REQUEST
*********************************************************/
UFA.ux = ( () => {

    var loader  = document.querySelector(".loader");

    function init() {

    }

    function hideLoader() {
      loader.classList.add("is-visible");
    }

    function showLoader() {
      loader.classList.add("hidden");
    }

    return {
        init: init,
        hideLoader: hideLoader,
        showLoader: showLoader
    };

})();
