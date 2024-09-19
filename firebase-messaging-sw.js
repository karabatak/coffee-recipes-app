importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js');

// Firebase projesi yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyBd5-nQCZM7IJUNyhPGe7EAOH5BpYFwjLY",
    authDomain: "coffee-recipes-app.firebaseapp.com",
    projectId: "coffee-recipes-app",
    storageBucket: "coffee-recipes-app.appspot.com",
    messagingSenderId: "640628349898",
    appId: "1:640628349898:web:d3146b2c06d0c778174d33",
    measurementId: "G-YGXRD8FM77"
};

// Firebase'i başlatıyoruz
firebase.initializeApp(firebaseConfig);

// Firebase Messaging servisini başlatıyoruz
const messaging = firebase.messaging();

// Arka planda gelen bildirimler
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background Message received:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png'  // Bildirim ikonu
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
