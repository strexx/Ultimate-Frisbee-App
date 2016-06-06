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
        });
    }

    return {
        init: init
    };

})();

UFA.launcher.init();
