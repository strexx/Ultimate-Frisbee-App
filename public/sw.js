var currentCacheName = 'UFA-assets-1.0';

this.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(currentCacheName).then(function(cache) {
      console.log('Caching: ' + currentCacheName);
      return cache.addAll([
		'/',
        '/dist/css/style.min.css',
        '/dist/js/app.min.js',
        '/dist/lib/fontfaceobserver.min.js',
        '/dist/lib/socket.io.min.js',
        '/dist/lib/modernizr.js',
        '/dist/img/icons/matches.png',
        '/dist/img/icons/tournaments.png',
        '/dist/img/icons/login.png',
        '/dist/img/icons/logout.png',
        '/dist/img/icons/favorites.png',
        '/sw.js',
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
    var request = event.request;
    var acceptHeader = request.headers.get('Accept');
    var resourceType = 'static';
    var cacheKey;

    if (acceptHeader.indexOf('text/html') !== -1) {
        resourceType = 'content';
    }

    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
				if (resourceType === 'content') {
					return fetchAndCache(event);
				}
                return response;
            } else {
                if (event.request.url.indexOf("socket.io") != -1) { // ignore socket polling
                    return fetch(event.request);
                } else {
                    return fetchAndCache(event);
                }
            }
        })
    );
});

function fetchAndCache(event) {
    return fetch(event.request).then(function(response) {
		if(response.ok){
	        return caches.open('UFA-other-1.0').then(function(cache) {
	            console.log('fetched and caching', event.request);
	            cache.put(event.request, response.clone());
	            return response;
	        });
		}
    });
}
