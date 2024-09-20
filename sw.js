const CACHE_NAME = 'coffee-recipes-cache-v42'; // Her yeni versiyon çıktığında bu değeri değiştirin
const urlsToCache = [
  '/coffee-recipes-app/',
  '/coffee-recipes-app/manifest.json',
  // '/coffee-recipes-app/index.html', // index.html'i cache'den çıkardık
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
  // Yeni Service Worker'ın hemen aktif hale gelmesini sağla
  self.skipWaiting(); 
});

// Activate event - Eski cache'leri temizler ve yeni Service Worker'ı devreye sokar
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
  // Yeni Service Worker'ın hemen aktif olmasını sağlar
  self.clients.claim(); 
});

// Fetch event - index.html için network first stratejisi uygular
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // HTML sayfaları için network first stratejisi
    event.respondWith(
      fetch(event.request)
        .then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  } else {
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
  }
});

// Kullanıcıya yeni bir sürüm olduğunu bildirir ve sayfayı yenilemeye zorlar
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
