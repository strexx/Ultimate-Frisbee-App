/*********************************************************
	UX & BEHAVIOUR
*********************************************************/
UFA.favourites = (() => {

    function init() { // src: http://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr
        /* Local Storage array  */
        if (localStorage.getItem('matchID') === null || localStorage.getItem('matchID') === "") {
            var arrayID = [];
        } else {
            var arrayID = JSON.parse(localStorage.getItem('matchID'));
        }

        // Create a new variable newArrayID for dynamic adding favourites.
        var newArrayID = arrayID;

        // Find button
        var _favouriteButton = document.querySelectorAll('.favourite-btn');

        // Check if ID is stored in array and make button active
        [].forEach.call(newArrayID, (ID) => {
            var _favouriteButtonID = document.querySelector('.favourite-btn[value="' + ID + '"]');
            if (_favouriteButtonID) {
                _favouriteButtonID.classList.add('active');
            }
        });

        // Favourite button eventlistener
        [].forEach.call(_favouriteButton, (button) => {
            //var buttonID = button.getAttribute('data-id');
            button.addEventListener('click', storeID, false);
        });

        function storeID(event) {
            event.preventDefault()
            var clickedID = this.getAttribute('value');
            arrayID.push(clickedID);

            // Remove class
            this.classList.remove('active');

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
                var _favouriteButtonID = document.querySelector('.favourite-btn[value="' + ID + '"]');
                if (_favouriteButtonID) {
                    _favouriteButtonID.classList.add('active');
                }
            });

            //var storeArrayId = JSON.stringify(newArrayID);
            localStorage.setItem('matchID', JSON.stringify(newArrayID));
        };
    };

    function houseFavourites(data) {

        if (localStorage.getItem("matchID") != null) {
            var IDs = localStorage.getItem('matchID');
        } else {
            var IDs = [];
        }

        /* Filter ID */
        var data = data.filter((c) => {
            return IDs.indexOf(c.id) != -1
        });

        console.log(data);

        APP.data.request('./dist/templates/house-favourites.mst')
            .then((template) => {
                _mainSelector.innerHTML = Mustache.render(template, data);
                _loader.classList.remove('active');

                APP.storage.init();
            })
    };


    return {
        init: init
    };

})();
