/*********************************************************
	NAMESPACE
*********************************************************/
var UFA = UFA || {};

/*********************************************************
    LAUNCH APP
*********************************************************/
UFA.launcher = ( () => {

    'use strict';

    function init() {
        document.addEventListener("DOMContentLoaded", function () {
            UFA.router.init();
            UFA.sw.init();
        });
    }

    return {
        init: init
    };

})();

// Feature detection for vanilla js
UFA.launcher.init();
