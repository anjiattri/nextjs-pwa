"use client";
import { useEffect, useState } from "react";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import firebaseApp from "../../firebase";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          // const messaging = getMessaging(firebaseApp);
          const messaging = (async () => {
            try {
              const isSupportedBrowser = await isSupported();
              if (isSupportedBrowser) {
                return getMessaging(firebaseApp);
              }
              console.log("Firebase not supported this browser");
              return null;
            } catch (err) {
              console.log(err);
              return null;
            }
          })();
          // Request notification permission
          const messagingResolve = await messaging;
          if ("Notification" in window) {
            const permission = await Notification.requestPermission();
            setNotificationPermissionStatus(permission);
            if (permission === "granted") {
              // alert("Notification permission granted!")
              const currentToken = await getToken(messagingResolve, {
                vapidKey:
                  "BOFBk0lQ53X7t4tA5yaRREGgcFHagfl7lBCTOFHKjoDrMxmw0w7D0PSo-61cOXqIkYhUTSY1gac8KjOXGx_GBOA", // Replace with your Firebase project's VAPID key
              });
              console.log("cure", currentToken);
              // alert(currentToken)
              if (currentToken) {
                setToken(currentToken);
              } else {
                console.log(
                  "No registration token available. Request permission to generate one."
                );
              }
            }
          }
        }
      } catch (error) {
        console.log("Error retrieving token:", error);
      }
    };

    retrieveToken();
  }, []);

  return { token, notificationPermissionStatus };
};

export default useFcmToken;
// 'use client'
// import { useEffect, useState } from 'react';
// import { getMessaging, getToken, isSupported } from 'firebase/messaging';
// import firebaseApp from '../../firebase';

// const useFcmToken = () => {
//   const [token, setToken] = useState('');
//   const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');

//   useEffect(() => {
//     const retrieveToken = async () => {
//       try {
//         // Initialize Firebase Messaging
//         const messaging = getMessaging(firebaseApp);

//         // Check if browser supports Firebase Cloud Messaging
//         const isSupportedBrowser = await isSupported();
//         if (!isSupportedBrowser) {
//           console.log('Firebase not supported in this browser');
//           return;
//         }

//         // Request notification permission
//         const permission = await Notification.requestPermission();
//         setNotificationPermissionStatus(permission);

//         if (permission === 'granted') {
//           // Retrieve FCM token
//           const currentToken = await getToken(messaging, {
//               vapidKey: 'BOFBk0lQ53X7t4tA5yaRREGgcFHagfl7lBCTOFHKjoDrMxmw0w7D0PSo-61cOXqIkYhUTSY1gac8KjOXGx_GBOA', // Replace with your Firebase project's VAPID key
//           });

//           console.log("currentToken", currentToken);

//           if (currentToken) {
//             setToken(currentToken);
//           } else {
//             console.log('No registration token available. Request permission to generate one.');
//           }
//         }
//       } catch (error) {
//         console.log('Error retrieving token:', error);
//       }
//     };

//     retrieveToken();
//   }, []);

//   return { token, notificationPermissionStatus };
// };

// export default useFcmToken;
