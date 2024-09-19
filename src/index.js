import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service worker kayıt fonksiyonu
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/coffee-recipes-app/sw.js').then(
      (registration) => {
        console.log('Service Worker kayıt başarılı: ', registration.scope);

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
        console.log('Service Worker kayıt başarısız: ', err);
      }
    );
  });
}


