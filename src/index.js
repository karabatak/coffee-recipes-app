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
      },
      (err) => {
        console.log('Service Worker kayıt başarısız: ', err);
      }
    );
  });
}
