(function() {
    var fontFamilies = {
        'Lato': [{
            weight: 400
        }, {
            weight: 300
        }, {
            weight: 700
        }],
        'Roboto Slab': [{
            weight: 300
        }]
    };

    var fontObservers = [];

    Object.keys(fontFamilies).forEach(function(family) {
        fontObservers.push(fontFamilies[family].map(function(config) {
            return new FontFaceObserver(family, config).check()
        }));
    });

    Promise.all(fontObservers)
        .then(function() {
            document.documentElement.className += "fonts-loaded";
        }, function() {
            console.log('Fonts not available');
        });
}());
