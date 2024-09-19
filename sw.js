const CACHE_NAME = 'coffee-recipes-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/static/js/main.8ce6c82d.js',
  '/static/css/main.b3376e87.css',
];

// Service worker kurulumunda önbelleğe alma
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Service worker ile fetch olayını yönetme (Dinamik Önbellekleme)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      // Dinamik olarak önbelleğe alma
      return fetch(event.request).then((networkResponse) => {
        // Eğer istek başarısız olursa (çevrimdışı vb.), boş bir yanıt döndür
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // Önbelleğe ekleme
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});