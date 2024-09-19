const CACHE_NAME = 'coffee-recipes-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/static/js/main.ae3d9131.js',
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

// Service worker ile fetch olayını yönetme
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Eğer önbellekte varsa, önbellekten döner, yoksa ağdan ister
      return response || fetch(event.request);
    })
  );
});