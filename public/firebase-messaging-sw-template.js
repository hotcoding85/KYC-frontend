importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js");

const firebaseConfig = {FIREBASE_CONFIG};
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
