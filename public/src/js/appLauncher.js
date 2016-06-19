/*********************************************************
	NAMESPACE [UFA = Ultimate Frisbee App]
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
            UFA.fontFaceObserver.init();
        });
    }

    return {
        init: init
    };

})();

// Feature detection
UFA.launcher.init();
