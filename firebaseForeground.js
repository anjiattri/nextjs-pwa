// "use client";
// import { getMessaging, onMessage } from "firebase/messaging";
// import firebaseApp from "./firebase";
// import { useEffect } from "react";
// import enableNotifications from "./utils/hooks/useFCMToken";
// // import useFcmToken from "./utils/hooks/useFCMToken";

// export default function FcmTokenComp() {
//   // const { fcmToken, notificationPermissionStatus } = useFcmToken();

//   useEffect(() => {
//     enableNotifications();
//     // if (typeof window !== "undefined" && "serviceWorker" in navigator) {
//     //   if (notificationPermissionStatus === "granted") {
//     //     const messaging = getMessaging(firebaseApp);
//     //     const unsubscribe = onMessage(messaging, (payload) =>
//     //       console.log("Foreground push notification received:", payload)
//     //     );
//     //     return () => {
//     //       unsubscribe(); // Unsubscribe from the onMessage event on cleanup
//     //     };
//     //   }
//     // }
//   }, []);

//   return null; // This component is primarily for handling foreground notifications
// }
