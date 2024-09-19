const CACHE_NAME = 'coffee-recipes-cache-v1';
const urlsToCache = [
  '/coffee-recipes-app/',
  '/coffee-recipes-app/index.html',
  '/coffee-recipes-app/manifest.json',
  '/coffee-recipes-app/static/js/main.8ce6c82d.js',
  '/coffee-recipes-app/static/css/main.b3376e87.css',
];

// Service worker kurulumunda sabit dosyaları önbelleğe al
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Dinamik olarak tüm dosyaları önbelleğe alma (fetch olayı ile)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});