importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');


// Firebase projesinin yapılandırması
firebase.initializeApp({
    apiKey: "AIzaSyBd5-nQCZM7IJUNyhPGe7EAOH5BpYFwjLY",
    authDomain: "coffee-recipes-app.firebaseapp.com",
    projectId: "coffee-recipes-app",
    storageBucket: "coffee-recipes-app.appspot.com",
    messagingSenderId: "640628349898",
    appId: "1:640628349898:web:d3146b2c06d0c778174d33",
    measurementId: "G-YGXRD8FM77"
});

// Firebase Messaging'i başlat
const messaging = firebase.messaging();

// Arka planda gelen mesajları dinleme
messaging.onBackgroundMessage((payload) => {
  console.log('Arka planda mesaj alındı:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png', // Bildirim ikonu (isteğe bağlı)
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});