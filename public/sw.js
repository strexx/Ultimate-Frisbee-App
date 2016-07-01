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
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if(response) {
                //console.log('found cached response', response);
                return response;
            } else {
                if (event.request.url.indexOf("socket.io") !== -1) { // ignore socket polling
                    return fetch(event.request);
                } else {
                    console.log('response not in cache, fetching it');
                    return fetch(event.request);
                    //return fetchAndCache(event);
                }
            }
        })
    );
});

// this.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches.match(event.request).then(function(res) {
//             return res || fetch(event.request).then(function(response) {
//                 if (event.request.url.indexOf("socket.io") != -1) { // ignore socket polling
//                        return fetchAndCache(event);
//                 }
//             });
//         })
//     );
// });

function fetchAndCache(event) {
    return fetch(event.request).then(function(response) {
        return caches.open('UFA-other-1.0').then(function(cache) {
            console.log('fetched and caching', event.request);
            cache.put(event.request, response.clone());
            return response;
        });
    });
};
