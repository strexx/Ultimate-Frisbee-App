/*********************************************************
	PAGE MODULE [with Promise]
*********************************************************/
UFA.page = (() => {

    var wrapperSelector = document.querySelector('#wrapper');

    function request(method, url) { // src: http://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr
        return new Promise(function(resolve, reject) {
            UFA.ux.showLoader();
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function() {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                    UFA.ux.hideLoader();
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                    UFA.ux.hideLoader();
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
        UFA.ux.toggleSection();
        UFA.ux.toggleClass();
        // request('GET', '/api/matches/recent')
        //     .then(function(APIdata) {
        //         var template = APIdata;
        //         wrapperSelector.innerHTML = template;
        //         UFA.ux.toggleClass();
        //     });
    }

    function matchesLive() {
        UFA.ux.toggleSection();
        UFA.ux.toggleClass();
        // request('GET', '/api/matches/live')
        //     .then(function(APIdata) {
        //         var template = APIdata;
        //         wrapperSelector.innerHTML = template;
        //         UFA.ux.toggleClass();
        //     });
    }

    function matchesUpcoming() {
        UFA.ux.toggleSection();
        UFA.ux.toggleClass();
        // request('GET', '/api/matches/upcoming')
        //     .then(function(APIdata) {
        //         var template = APIdata;
        //         wrapperSelector.innerHTML = template;
        //         UFA.ux.toggleClass();
        //     });
    }

    function matchInfo(ID) {
        UFA.ux.toggleSection();
        UFA.ux.toggleClass();

    }

    function matchScores(ID) {
        request('GET', '/api/match/' + ID)
            .then(function(APIdata) {
                var template = APIdata;
                wrapperSelector.innerHTML = template;
                UFA.data.socket();
                UFA.ux.toggleSection();
                UFA.ux.toggleClass();

            });
    }

    function matchLocation(ID) {
        UFA.ux.toggleSection();
        UFA.ux.toggleClass();
    }

    return {
        request: request,
        matchesRecent: matchesRecent,
        matchesLive: matchesLive,
        matchesUpcoming: matchesUpcoming,
        matchInfo: matchInfo,
        matchScores: matchScores,
        matchLocation: matchLocation
    };

})();
