import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { requestNotificationPermission, onMessageListener } from './push-notification';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Bildirim izni isteme ve FCM token'ı alma
requestNotificationPermission().then((token) => {
  if (token) {
    console.log('FCM Token alındı:', token);
    // Token'ı sunucunuza kaydedin
  }
});

// Ön planda gelen bildirimleri dinleme
onMessageListener().then((payload) => {
  console.log('Mesaj alındı:', payload);
  alert(`Yeni bildirim: ${payload.notification.title} - ${payload.notification.body}`);
});

// Push bildirimler için Firebase Messaging service worker'ı kaydetme
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // firebase-messaging-sw.js dosyasını kaydediyoruz
    navigator.serviceWorker.register('/coffee-recipes-app/firebase-messaging-sw.js').then(
      (registration) => {
        console.log('Firebase Messaging Service Worker kayıt başarılı:', registration.scope);
      },
      (err) => {
        console.log('Firebase Messaging Service Worker kayıt başarısız:', err);
      }
    );

    // PWA veya diğer işlemler için sw.js dosyasını kaydediyoruz
    navigator.serviceWorker.register('/coffee-recipes-app/sw.js').then(
      (registration) => {
        console.log('PWA Service Worker (sw.js) kayıt başarılı:', registration.scope);

        // Service Worker güncellemesi kontrolü
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // Yeni bir Service Worker mevcut
                console.log('Yeni içerik mevcut, sayfa yenileniyor.....');
                
                // Yeni Service Worker'ı devreye sok
                installingWorker.postMessage({ type: 'skipWaiting' });
                
                // Sayfa otomatik olarak yenilenir ve yeni içerik yüklenir
                window.location.reload();
              }
            }
          };
        };
      },
      (err) => {
        console.log('PWA Service Worker (sw.js) kayıt başarısız:', err);
      }
    );
  });
}

