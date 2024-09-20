import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

// Firebase projenizin yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyBd5-nQCZM7IJUNyhPGe7EAOH5BpYFwjLY",
  authDomain: "coffee-recipes-app.firebaseapp.com",
  projectId: "coffee-recipes-app",
  storageBucket: "coffee-recipes-app.appspot.com",
  messagingSenderId: "640628349898",
  appId: "1:640628349898:web:d3146b2c06d0c778174d33",
  measurementId: "G-YGXRD8FM77"
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Firebase Messaging'i başlat
export const messaging = getMessaging(app);