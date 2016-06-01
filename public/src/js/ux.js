/*********************************************************
	DATA REQUEST
*********************************************************/
UFA.ux = ( () => {

    var loader  = document.querySelector(".loader");

    function init() {

    }

    function showLoader() {
        loader.classList.add("active");
    }

    function hideLoader() {
        loader.classList.remove("active");
    }

    return {
        init: init,
        showLoader: showLoader,
        hideLoader: hideLoader
    };

})();
