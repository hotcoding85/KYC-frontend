// lib/firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_measurementId,
};

// Ensure Firebase is only initialized once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

// Export messaging only for client-side usage
let messaging;

if (typeof window !== 'undefined') {
  messaging = firebase.messaging();
}

export { messaging };
