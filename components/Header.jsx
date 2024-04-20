import React, { useCallback, useEffect } from "react";
const Header = () => {
  return (
    <div className="flex justify-between px-4 pt-4">
      <h2>Dashboard</h2>
      <h2
        onClick={() => {
          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            navigator.serviceWorker.getRegistration().then((reg) => {
              // reg.showNotification("Go go");
              reg.showNotification("Push Notification", {
                body: "this is from header",
                icon: "./icons/maskable.png",
                badge: "./icons/maskable.png",
                image: "./icons/maskable.png",
              });
            });
          }
        }}
      >
        Welcome back,Anjali
      </h2>
    </div>
  );
};

export default Header;
