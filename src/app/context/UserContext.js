"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import useApi from "@/hooks/useApi";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
const NotificationListener = dynamic(
  () => import("@/hooks/notificationListener"),
  {
    ssr: false,
  }
);
// import NotificationListener from "@/hooks/notificationListener";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebase from "firebase/compat/app";
import "firebase/messaging";
import { messaging } from "@/utils/firebaseConfig";
const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { fetchData } = useApi();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const firebaseConfig = {
    apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_apiKey}`,
    authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_authDomain}`,
    projectId: `${process.env.NEXT_PUBLIC_FIREBASE_projectId}`,
    storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_storageBucket}`,
    messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId}`,
    appId: `${process.env.NEXT_PUBLIC_FIREBASE_appId}`,
    measurementId: `${process.env.NEXT_PUBLIC_FIREBASE_measurementId}`,
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      // Initialize Firebase
      if (!firebase?.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      // Register the service worker
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then((registration) => {
            console.log("Service Worker registered:", registration);
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
      }

      Notification.requestPermission();
      messaging
        .getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY,
        })
        .then((token) => {
          saveFCMTokenToServer(token, user.user_id);
        });

      // get Notifications
      getNotifications(user.user_id);
      // Listen for foreground messages
      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        // Handle foreground notifications here
      });
    }
  }, [isAuthenticated, user]);

  const getNotifications = async (user_id, page = 1, pageSize = -1) => {
    if (!user_id) user_id = user.user_id;

    let url = `/users/getNotifications/${user_id}/${page}`;
    if (pageSize) {
      url += "/" + pageSize;
    }
    try {
      const { result, error } = await fetchData(url, {
        method: "GET",
      });

      if (error) {
        console.error("Failed to fetch notifications:", error);
      } else {
        setNotifications(result);
        return result;
      }
    } catch (err) {
      console.error("Unexpected error while fetching notifications:", err);
    }
  };

  useEffect(() => {
    if (user) {
      getNotifications(user.user_id);
    }
  }, [user]);

  const saveFCMTokenToServer = async (token, user_id) => {
    try {
      const { result, error } = await fetchData(`/auth/save_fcm/`, {
        method: "POST",
        body: {
          token: token,
          user_id: user_id,
        },
      });
    } catch (err) {
      console.error("Unexpected error while fetching user:", err);
    }
  };

  const setTheme = async (theme) => {
    document.documentElement.style.setProperty("--primary-color", theme || "#000");
  };

  const fetchUser = async () => {
    try {
      const { result, error } = await fetchData(`/auth/me/`, {
        method: "POST",
      });

      if (error) {
        console.error("Failed to fetch user:", error);
      } else {
        setUser(result);
        setTheme(result?.company?.branding?.theme || "#000");
      }
    } catch (err) {
      console.error("Unexpected error while fetching user:", err);
    }
  };

  if (!user && attemptCount < 3) {
    fetchUser();
    setAttemptCount((prev) => prev + 1);
  }

  useEffect(() => {
    const setTheme = async (theme) => {
      document.documentElement.style.setProperty(
        "--primary-color",
        theme || "#000"
      );
    };

    const fetchUser = async () => {
      try {
        const { result, error } = await fetchData(`/auth/me/`, {
          method: "POST",
        });

        if (error) {
          console.error("Failed to fetch user:", error);
        } else {
          setUser(result);
          setTheme(result?.company?.branding?.theme || "#000");
        }
      } catch (err) {
        console.error("Unexpected error while fetching user:", err);
      }
    };

    if (!user && attemptCount < 3 && isAuthenticated) {
      fetchUser();
      setAttemptCount((prev) => prev + 1); // Increment attempt count
    }
  }, [fetchData, attemptCount, isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        notifications,
        setNotifications,
        getNotifications,
      }}
    >
      <ToastContainer />
      <NotificationListener user={user} />
      {children}
    </UserContext.Provider>
  );
};
