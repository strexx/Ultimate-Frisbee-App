var currentCacheName = 'UFA-assets-1.0';

this.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(currentCacheName).then(function(cache) {
      console.log('Caching: ' + currentCacheName);
      return cache.addAll([
        './',
        '/dist/css/style.min.css',
        '/dist/js/app.min.js',
        '/dist/lib/fontfaceobserver.js',
        '/dist/lib/socket.io.js',
        '/sw.js'
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
                    //console.log('response not in cache, fetching it');
                    //return fetch(event.request);
                    return fetchAndCache(event);
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
