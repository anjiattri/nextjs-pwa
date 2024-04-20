import Sidebar from "@/components/Sidebar";
import "./../styles/globals.css";
import { useEffect, useState } from "react";
import FcmTokenComp from "@/firebaseForeground";
export default function App({ Component, pageProps }) {
  const [mode, setMode] = useState("online");
  // const [mounted, setMounted] = useState(false);
  // if (mounted) {
  //   firebaseCloudMessaging.onMessage();
  // }
  // useEffect(() => {
  //   firebaseCloudMessaging.init();
  //   const setToken = async () => {
  //     const token = await firebaseCloudMessaging.tokenInlocalforage();
  //     if (token) {
  //       setMounted(true);
  //       // not working
  //     }
  //   };
  //   const result = setToken();
  //   console.log("result", result);
  // }, []);
  // useEffect(() => {
  //   setToken();
  //   async function setToken() {
  //     try {
  //       const token = await firebaseCloudMessaging.init();
  //       if (token) {
  //         getMessage();
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   function getMessage() {
  //     const messaging = firebase.messaging();
  //     console.log({ messaging });
  //     messaging.onMessage((message) => {
  //       const { title, body } = JSON.parse(message.data.notification);
  //       var options = {
  //         body,
  //       };
  //       self.registration.showNotification(title, options);
  //     });
  //   }
  // });

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // Check if service worker is already registered
      if (navigator.serviceWorker.controller) {
        console.log(
          "Service worker already registered:::::",
          navigator.serviceWorker.controller
        );

        // generateToken();
        // Request permission for notifications
        // Notification.requestPermission().then((permission) => {
        //   if (permission === "granted") {
        //     console.log("Notification permission granted.");
        //     new Notification("hello world-->", {
        //       icon: "./../favicon.ico",
        //       badge: "./../favicon.ico",
        //     });
        //     // Subscribe to push notifications
        //     // reg.pushManager
        //     //   .subscribe({
        //     //     userVisibleOnly: true,
        //     //     applicationServerKey: "YOUR_PUBLIC_KEY",
        //     //   })
        //     //   .then((subscription) => {
        //     //     console.log("Push subscription:", subscription);
        //     //     // Send subscription to server for future use
        //     //   })
        //     //   .catch((error) => {
        //     //     console.error("Push subscription error:", error);
        //     //   });
        //   } else {
        //     console.warn("Notification permission denied.");
        //   }
        // });

        // Request permission for notifications
        // if ("Notification" in window) {
        //   Notification.requestPermission().then((permission) => {
        //     if (permission === "granted") {
        //       console.log("Notification permission granted.");
        //     } else {
        //       console.warn("Notification permission denied.");
        //     }
        //   });
        // }
      } else {
        // If not, register the service worker
        console.log("Registering service worker...");
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((reg) => {
            console.log("Service worker registered:", reg);
            // Notification.requestPermission(function (result) {
            //   if (result === "granted") {
            //     navigator.serviceWorker.ready.then(function (registration) {
            //       registration.showNotification("Notification Enabled");
            //     });
            //   }
            // });
            // console.log("Scope:", reg.scope);
            // firebaseCloudMessaging.init();
          })
          .catch((err) => {
            console.error("Service worker registration failed:", err);
          });
      }
    }
  }, []);

  return (
    <Sidebar>
      <FcmTokenComp /> {/* Render for foreground notification handling */}
      <Component {...pageProps} />
    </Sidebar>
  );
}
