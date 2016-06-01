/*********************************************************
	PAGE MODULE [with Promise]
*********************************************************/
UFA.page = ( () => {

    var bodySelector = document.querySelector('body');

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
        bodySelector.innerHTML = template;
        UFA.data.socket();
      })
    }

    function matchesLive() {
        request('GET', 'api/matches/live')
            .then(function(APIdata) {
                var template = APIdata;
                bodySelector.innerHTML = template;
                UFA.data.socket();
            })
    }


    function matchesUpcoming() {
        request('GET', 'api/matches/upcoming')
            .then(function(APIdata) {
                var template = APIdata;
                bodySelector.innerHTML = template;
                UFA.data.socket();
                // remove loader
            })
    }

    return {
        request: request,
        matchesRecent: matchesRecent,
        matchesLive: matchesLive,
        matchesUpcoming: matchesUpcoming
    };

})();
