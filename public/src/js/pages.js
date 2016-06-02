/*********************************************************
	PAGE MODULE [with Promise]
*********************************************************/
UFA.page = (() => {

    var wrapperSelector = document.querySelector('#wrapper');

    function request(method, url) { // src: http://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function() {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function() {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }

    function matchesRecent() {
        request('GET', 'api/matches/recent')
            .then(function(APIdata) {
                console.log("Asked for recents");
                var template = APIdata;
                wrapperSelector.innerHTML = template;
                UFA.data.socket();
                // remove loader
                UFA.ux.hideLoader();
                UFA.ux.toggleMenu();
                UFA.ux.toggleClass();
            });
    }

    function matchesLive() {
        request('GET', 'api/matches/live')
            .then(function(APIdata) {
                var template = APIdata;
                wrapperSelector.innerHTML = template;
                UFA.data.socket();
                // remove loader
                UFA.ux.hideLoader();
                UFA.ux.toggleMenu();
                UFA.ux.toggleClass();
            });
    }


    function matchesUpcoming() {
        request('GET', 'api/matches/upcoming')
            .then(function(APIdata) {
                var template = APIdata;
                wrapperSelector.innerHTML = template;
                UFA.data.socket();
                // remove loader
                UFA.ux.hideLoader();
                UFA.ux.toggleMenu();
                UFA.ux.toggleClass();
            });
    }

    return {
        request: request,
        matchesRecent: matchesRecent,
        matchesLive: matchesLive,
        matchesUpcoming: matchesUpcoming
    };

})();
