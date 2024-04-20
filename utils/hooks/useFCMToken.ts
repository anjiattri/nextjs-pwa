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
          // alert("Notification" in window);
          if ("Notification" in window) {
            Notification.requestPermission().then(async (permission) => {
              // alert("no");

              setNotificationPermissionStatus(permission);
              if (permission === "granted") {
                // alert("Notification permission granted!");
                try {
                  const currentToken = await getToken(messagingResolve, {
                    vapidKey:
                      "BOFBk0lQ53X7t4tA5yaRREGgcFHagfl7lBCTOFHKjoDrMxmw0w7D0PSo-61cOXqIkYhUTSY1gac8KjOXGx_GBOA",
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
                } catch (error) {
                  console.error("Error getting token:", error);
                }
              } else {
                console.warn("Notification permission denied.");
              }
            });
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
