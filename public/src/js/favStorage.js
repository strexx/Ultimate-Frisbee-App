/*********************************************************
	UX & BEHAVIOUR
*********************************************************/
UFA.favorites = (() => {

    function init() {

        function readCookie(key) {
            var nameEQ = key + "=";
            var ca = document.cookie.split(';');
            for (var i = 0, max = ca.length; i < max; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
        var cookieID = readCookie("matchID");
        if (cookieID === null) {
            var arrayID = [];
        } else {
            var arrayID = JSON.parse(cookieID);
        }


    // Create a new variable newArrayID for dynamic adding favorites.
    var newArrayID = arrayID;

    // Find button
    var _favoriteButton = document.querySelectorAll('.favorite__btn');

    // Check if ID is stored in array and make button active
    [].forEach.call(newArrayID, (ID) => {
        var _favoriteButtonID = document.querySelector('.favorite__btn[value="' + ID + '"]');
        if (_favoriteButtonID) {
            _favoriteButtonID.classList.add('pop--active');
        }
    });

    // favorite button eventlistener
    [].forEach.call(_favoriteButton, (button) => {
        //var buttonID = button.getAttribute('data-id');
        button.addEventListener('click', storeID, false);
    });

    function storeID(event) {
        event.preventDefault()
        var clickedID = this.getAttribute('value');
        arrayID.push(clickedID);

        // Remove class
        this.classList.remove('pop--active');

        /*  CHECK FOR DUPLICATED ID's - src: https://jsfiddle.net/BumbleB2na/XvgTb/1/ */
        for (var h = 0; h < newArrayID.length; h++) {
            var curItem = newArrayID[h],
                foundCount = 0;
            // search array for item
            for (var i = 0; i < newArrayID.length; i++) {
                if (newArrayID[i] == arrayID[h])
                    foundCount++;
            }
            if (foundCount > 1) {
                // remove repeated item from new array
                for (var j = 0; j < newArrayID.length; j++) {
                    if (newArrayID[j] == curItem) {
                        newArrayID.splice(j, 1);
                        j = j - 1;
                    }
                }
            }
        };

        // Check if ID is stored in array and make button active
        [].forEach.call(newArrayID, (ID) => {
            var _favoriteButtonID = document.querySelector('.favorite__btn[value="' + ID + '"]');
            if (_favoriteButtonID) {
                _favoriteButtonID.classList.add('pop--active');
            }
        });

        function createCookie(key, value, exp) {
            var date = new Date();
            date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
            document.cookie = key + "=" + value + expires + "; path=/";
        }

        var storeArrayID = JSON.stringify(newArrayID);
        createCookie('matchID', storeArrayID, 30);
    };
};

return {
    init: init
};

})();
