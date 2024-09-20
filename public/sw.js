const CACHE_NAME = 'coffee-recipes-cache-v47'; 
// Cache alanımızın adı. 
// Versiyon her yükseltildiğinde eski cache'ler temizlenir.

const urlsToCache = [
  '/coffee-recipes-app/',
  '/coffee-recipes-app/manifest.json',
  '/coffee-recipes-app/icons/icon-192x192.png',
  '/coffee-recipes-app/icons/icon-512x512.png',
];
// Bu dosyalar ilk kez yüklenirken cache'e eklenir.

// Install event: Service Worker ilk yüklendiğinde veya güncellendiğinde tetiklenir
self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // caches.open: CACHE_NAME altında bir cache alanı açar. 
      // Bu alanda belirtilen dosyalar depolanacak.
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
      // cache.addAll: urlsToCache dizisindeki tüm dosyaları cache'e ekler.
    })
  );
  
  // Yeni Service Worker'ın hemen aktif hale gelmesini sağla
  // Normalde Service Worker güncellendiğinde sayfa yenilendiğinde devreye girer, 
  // skipWaiting() çağrısı ile bu süreci atlayarak hemen devreye girmesini sağlıyoruz.
  self.skipWaiting(); 
});

// Activate event: Service Worker aktif hale getirildiğinde tetiklenir. 
// Eski versiyonları silmek için kullanılır.
self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      // caches.keys: Tarayıcıdaki tüm cache alanlarının adlarını alır.
      return Promise.all(
        cacheNames.map(cacheName => {
          // Eğer cacheName bizim mevcut CACHE_NAME'imize eşit değilse, o cache silinir.
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
            // caches.delete: Eski cache'i temizler.
          }
        })
      );
    })
  );
  
  // self.clients.claim: Yeni service worker'ın hemen kontrolü ele almasını sağlar, 
  // yani tüm açık sayfalara yeni SW'nin uygulanmasını garanti eder.
  self.clients.claim(); 
});

// Fetch event: Uygulama herhangi bir kaynak (örn. sayfa, dosya) talep ettiğinde tetiklenir.
// Bu olay, cache'deki veya network'teki dosyaları döndürmek için kullanılır.
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // Eğer istek bir HTML sayfası içinse (navigasyon isteği), network-first stratejisi uygula.
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Eğer network başarılıysa, cevabı cache'e koy ve döndür.
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            // response.clone: Aynı cevabı iki kez kullanabilmek için clone edilmesi gerekir.
            return response;
          });
        })
        .catch(() => {
          // Eğer network başarısız olursa, cache'deki dosyayı döndür.
          return caches.match(event.request);
        })
    );
  } else {
    const requestUrl = new URL(event.request.url);

    // Eğer istek bir statik JS veya CSS dosyası içinse, cache'den veya network'ten döndür.
    if (requestUrl.pathname.startsWith('/coffee-recipes-app/static/js/') || 
        requestUrl.pathname.startsWith('/coffee-recipes-app/static/css/')) {
      event.respondWith(
        caches.match(event.request).then(response => {
          return response || fetch(event.request).then(fetchResponse => {
            // Network'ten gelen cevabı cache'e koy ve ardından döndür.
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request.url, fetchResponse.clone());
              return fetchResponse;
            });
          });
        })
      );
    } else {
      // Diğer tüm isteklerde, önce cache'de kontrol et, yoksa network'ten getir.
      event.respondWith(
        caches.match(event.request).then(response => {
          return response || fetch(event.request);
        })
      );
    }
  }
});

// Mesaj event'i: Client'tan gelen mesajları dinler. 
// 'skipWaiting' mesajı alındığında, yeni service worker'ı hemen devreye sokar.
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    // skipWaiting: Yeni SW'ın hemen devreye girmesini sağlar.
  }
});
