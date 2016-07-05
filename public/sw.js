var currentCacheName = 'UFA-static-1.0';

this.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(currentCacheName).then(function(cache) {
      //console.log('Caching: ' + currentCacheName);
      return cache.addAll([
		'/',
		'/tournaments/',
		'/favorites/',
		'/login/'
      ]);
    })
  );
});

this.addEventListener('activate', function(event) {
	//console.log('delete old caches');
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames
					.filter(function(cacheName) {
						return cacheName.startsWith('UFA-.');
					})
					.filter(function(cacheName) {
						return cacheName !== currentCacheName;
					})
					.map(function(cacheName) {
						//console.log('deleted cache', cacheName);
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

    //console.log(acceptHeader);

    if (acceptHeader.indexOf('text/html') !== -1) {
        resourceType = 'content';
    }

    if (resourceType === 'content') {
        event.respondWith(
            fetch(request)
            .then(response => fetchAndCache(request, response))
            .catch(() => fetchFromCache(event))
        );
    }
	else {
		if (request.url.indexOf("transport=polling") == -1) { // ignore socket polling
	        event.respondWith(
	            fetchFromCache(event)
	            .catch(() => fetch(request))
	            .then(response => fetchAndCache(request, response))
	        );
		}
    }
});

function fetchFromCache (event) {
  return caches.match(event.request).then(response => {
    if (!response) {
      throw Error(`${event.request.url} not found in cache`);
    }
	//console.log(response);
    return response;
  });
}

function fetchAndCache(request, response) {
	if (response.ok) {
		var copy = response.clone();
        caches.open('UFA-other-1.0').then(function(cache) {
			//console.log('fetched and caching', request);
            cache.put(request, copy);
        });
	}
	return response;
}
