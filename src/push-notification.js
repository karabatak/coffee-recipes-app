import { messaging } from './firebase-config';
import { getToken, onMessage } from 'firebase/messaging';

// VAPID anahtarını eklemeyi unutmayın (Firebase Console'dan alınabilir)
const VAPID_KEY = 'BGXFuxwO3SaIOv-J6k6p-Q9JJKirFCHusZYsmEW4XbTx3_ewqdi03nXGPemkjYeXPyGVFpXYzq8mhh3cTE6-A2Y';

// Bildirim izni isteme ve token alma fonksiyonu
export const requestNotificationPermission = async (registration) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const currentToken = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration,
      });
      console.log('FCM Token:', currentToken);
      return currentToken;
    } else {
      console.log('Bildirim izni reddedildi.');
    }
  } catch (err) {
    console.error('Bildirim izni alma hatası:', err);
  }
};

// Ön planda gelen mesajları dinleme fonksiyonu
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Ön planda mesaj alındı:', payload);
      resolve(payload);
    });
  });