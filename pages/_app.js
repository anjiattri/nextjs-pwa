import Sidebar from "@/components/Sidebar";
import "./../styles/globals.css";
import { useEffect } from "react";
import enableNotifications from "@/utils/hooks/useFCMToken";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    enableNotifications();
    if ("serviceWorker" in navigator) {
      // Check if service worker is already registered
      if (navigator.serviceWorker.controller) {
        console.log(
          "Service worker already registered:::::",
          navigator.serviceWorker.controller
        );
      } else {
        // If not, register the service worker
        console.log("Registering service worker...");
        navigator.serviceWorker
          .register("/service-worker.js", { scope: "." })
          .then((reg) => {
            // alert("Service worker registered");
            console.log("Service worker registered:", reg);
          })
          .catch((err) => {
            console.error("Service worker registration failed:", err);
          });
      }
    }
  }, []);

  return (
    <Sidebar>
      <Component {...pageProps} />
    </Sidebar>
  );
}
