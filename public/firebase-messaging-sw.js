importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js");

const firebaseConfig = {
  "apiKey": "AIzaSyAtcdkcT4rAydogxwYOYlI3Nxblw_oiTLY",
  "authDomain": "thirteenx-69dbc.firebaseapp.com",
  "projectId": "thirteenx-69dbc",
  "storageBucket": "thirteenx-69dbc.firebasestorage.app",
  "messagingSenderId": "932724457864",
  "appId": "1:932724457864:web:a5eea29749e114b56e7a3d",
  "measurementId": "G-8VVJ1PZYHQ"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title || "Background Message Title";
  const notificationOptions = {
    body: payload.notification.body || "Background Message body.",
    icon: payload.notification.icon || "/firebase-logo.png",
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
