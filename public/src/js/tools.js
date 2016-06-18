/*********************************************************
	TOOLS MODULE [Ajax requests with promises]
*********************************************************/
UFA.tools = (() => {

    function request(url) { // src: http://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr
        return new Promise(function(resolve, reject) {
            UFA.ux.showLoader(); // show loader
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url); // method = always GET
            xhr.onload = function() {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                    UFA.ux.hideLoader(); // hide loader
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                    UFA.ux.hideLoader(); // hide loader
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

    return {
        request: request
    };

})();
