import { getMessaging, getToken, isSupported } from "firebase/messaging";
import firebaseApp from "../../firebase";

// Define the function to retrieve FCM token and notification permission status
const enableNotifications = async () => {
  try {
    // Check if the browser supports Firebase and if notification permission is not granted
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = await (async () => {
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

      if (messaging) {
        const permission = await Notification.requestPermission();
        // alert(permission);

        if ("Notification" in window && permission === "granted") {
          try {
            const currentToken = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            });
            console.log("cure", currentToken);
          } catch (error) {
            console.error("Error getting token:", error);
          }
        } else {
          console.warn("Notification permission denied.");
        }
      }
    }
  } catch (error) {
    console.log("Error retrieving token:", error);
  }
};

// Export the function
export default enableNotifications;
