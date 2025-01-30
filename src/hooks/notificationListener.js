'use client'
// notificationListener.js
import { useEffect } from 'react';
import { messaging } from '@/utils/firebaseConfig';
import { toast } from 'react-toastify';
import { useUser } from '@/app/context/UserContext';
const NotificationListener = ({user}) => {
  const { getNotifications } = useUser()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This handler listens for foreground notifications
      messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        // Handle foreground notifications (e.g., show a modal, update UI, etc.)
        if (user) {
          getNotifications(user?.user_id)
        }
      });
    }
    return () => {
      messaging.onMessage(() => {}); // Cleanup when component unmounts
    };
  }, [user]);

  return null;
};

export default NotificationListener;
