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

// Service worker ile fetch olayını yönetme
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});