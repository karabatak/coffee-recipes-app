const CACHE_NAME = 'coffee-recipes-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Uygulamanın diğer gerekli dosyalarını ekle
];

// Kurulum (install) olayı
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Aktifleşme (activate) olayı
self.addEventListener('activate', (event) => {
  // Eski cache'leri temizleme işlemi burada yapılabilir
});

// Fetch olayı
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache'de bulursa döndürür, bulamazsa ağdan ister
      return response || fetch(event.request);
    })
  );
});
