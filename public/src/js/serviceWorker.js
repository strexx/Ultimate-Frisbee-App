UFA.sw = (() => {
    'use strict';

    function init() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js', {
                    scope: './'
                })
                .then(function(reg) {
                    console.log('registered sw scoped to ' + reg.scope)
                });
        } else {
            console.log('ServiceWorker is not supported');
        }
    }

    return {
      init: init
    };

})();
