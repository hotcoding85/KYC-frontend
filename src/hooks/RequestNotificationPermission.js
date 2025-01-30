// requestNotificationPermission.js
'use client'
import { useEffect, useState } from 'react';
import { messaging } from '@/utils/firebaseConfig';
require('dotenv').config();
const RequestNotificationPermission = () => {
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try {
        await Notification.requestPermission();
        console.log(process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY)
        const token = await messaging.getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY })
        setFcmToken(token);
        console.log("token", token)
        // Optionally, send the token to your backend so it can be used for notifications
        await fetch('/api/save-fcm-token', {
          method: 'POST',
          body: JSON.stringify({ token }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error getting notification token:', error);
      }
    };

    getToken();
  }, []);

  return <></>;
};

export default RequestNotificationPermission;
