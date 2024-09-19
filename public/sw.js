const CACHE_NAME = 'coffee-recipes-cache-v9'; // Her yeni versiyon çıktığında bu değeri değiştirin
const urlsToCache = [
  '/coffee-recipes-app/',
  '/coffee-recipes-app/index.html',
  '/coffee-recipes-app/manifest.json',
];

// Install event - Dosyalar ilk defa cache'e ekleniyor
self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Yeni sürüm hemen aktif olsun
});

// Activate event - Eski cache'leri temizler
self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Yeni sürüm hemen devreye girsin
});

// Fetch event - Dinamik olarak js ve css dosyalarını cache'e ekler
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // Sadece static js ve css dosyalarını cache'le
  if (requestUrl.pathname.startsWith('/coffee-recipes-app/static/js/') || requestUrl.pathname.startsWith('/coffee-recipes-app/static/css/')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request.url, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  } else {
    // Diğer tüm isteklerde cache veya network fallback yap
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});

// Kullanıcıya yeni bir sürüm olduğunu bildirir ve sayfayı yenilemeye zorlar
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
