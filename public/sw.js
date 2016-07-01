var currentCacheName = 'UFA-assets-1.0';

this.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(currentCacheName).then(function(cache) {
      console.log('Caching: ' + currentCacheName);
      return cache.addAll([
        './',
        '/dist/css/style.min.css',
        '/dist/js/app.min.js',
        '/dist/lib/fontfaceobserver.min.js',
        '/dist/lib/socket.io.min.js',
        '/dist/lib/modernizr.js',
        '/dist/img/icons/matches.png',
        '/dist/img/icons/tournaments.png',
        '/dist/img/icons/login.png',
        '/dist/img/icons/logout.png',
        '/sw.js',
        'https://fonts.googleapis.com/css?family=Lato:100,300,400,700',
        'https://fonts.googleapis.com/css?family=Roboto+Slab:300',
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css'
      ]);
    })
  );
});

this.addEventListener('activate', function(event) {
	console.log('delete old caches');
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames
					.filter(function(cacheName) {
						return cacheName.startsWith('UFA-assets-1.');
					})
					.filter(function(cacheName) {
						return cacheName !== currentCacheName;
					})
					.map(function(cacheName) {
						console.log('deleted cache', cacheName);
						return caches.delete(cacheName);
					})
			);
		})
	);
});

this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if(response) {
                    //console.log('found cached response', response);
                    return response;
                } else {
                    //if (event.request.url.indexOf("socket.io") != -1) { // ignore socket polling
                        //return fetch(event.request);
                    //} else {
                        return fetch(event.request).then(function() {
                            console.log('response not in cache, fetching it');
                            return fetchAndCache(event);
                        });
                    //}
                }
            })
    );
});

function fetchAndCache(event) {
    return fetch(event.request).then(function(response) {
        return caches.open('UFA-other-1.0').then(function(cache) {
            console.log('fetched and caching', event.request);
            cache.put(event.request, response.clone());
            return response;
        });
    });
};
