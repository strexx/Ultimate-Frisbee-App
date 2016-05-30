/*********************************************************
	NAMESPACE
*********************************************************/
var UFA = UFA || {};
'use strict';

/*********************************************************
    LAUNCH APP
*********************************************************/
UFA.launcher = ( () => {

    function init() {
        document.addEventListener("DOMContentLoaded", function () {
            UFA.data.socket();
            UFA.ux.init();
        });
    }

    return {
        init: init
    };

})();

UFA.launcher.init();
