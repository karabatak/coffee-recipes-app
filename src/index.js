import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Service worker kayıt fonksiyonu
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('Service Worker kayıt başarılı: ', registration.scope);
      },
      (err) => {
        console.log('Service Worker kayıt başarısız: ', err);
      }
    );
  });
}

ReactDOM.render(<App />, document.getElementById('root'));
