// const CACHE_NAME = "version-1";
// const urlsToCache = [
//   "offline.html",
//   "_next/static/chunks/pages/settings.js",
//   "_next/static/chunks/pages/index.js",
//   "_next/static/chunks/main.js",
// ];
// let cacheVersion = 0;
// // let CACHE_NAME = `cache-version-${cacheVersion}`;
// // function increment() {
// //   cacheVersion++;
// //   cacheName = `cache-v${cacheVersion}`;
// // }
// const self = this;
// //install SW
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       // increment();
//       console.log("open cache ->");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // listen for request
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then(() => {
//       console.log("event", event.request);
//       return fetch(event.request).catch(() => caches.match("offline.html"));
//     })
//   );
// });
// // self.addEventListener("fetch", (event) => {
// //   const { request } = event;

// //   // Check if the request is for the orders page
// //   // if (request.url.includes("/orders")) {
// //   //   // Respond with the offline page for orders
// //   //   event.respondWith(caches.match("offline.html"));
// //   //   console.log("heihdie");
// //   // }
// //   // else {
// //   // For other requests, try to serve from cache or fetch from network
// //   event.respondWith(
// //     caches.match(request).then((cachedResponse) => {
// //       if (cachedResponse) {
// //         return cachedResponse; // Serve cached response if available
// //       }

// //       // If not cached, fetch from network
// //       // return fetch(request)
// //       //   .then((networkResponse) => {
// //       //     // Cache the fetched response
// //       //     return caches.open(CACHE_NAME).then((cache) => {
// //       //       cache.put(request, networkResponse.clone());
// //       //       return networkResponse;
// //       //     });
// //       //   })
// //       //   .catch(() => {
// //       //     // If fetch fails, respond with offline page
// //       //     return caches.match("offline.html");
// //       //   });
// //     })
// //   );
// //   // }
// // });

// //activate the SW
// // self.addEventListener("activate", async (event) => {
// //   const cacheWhiteList = [CACHE_NAME];

// //   // Clearing old caches
// //   event.waitUntil(
// //     caches.keys().then((cacheNames) =>
// //       Promise.all(
// //         cacheNames.map((cacheName) => {
// //           if (!cacheWhiteList.includes(cacheName)) {
// //             return caches.delete(cacheName);
// //           }
// //         })
// //       )
// //     )
// //   );

// //   // const urlBase64ToUint8Array = (base64String) => {
// //   //   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
// //   //   const base64 = (base64String + padding)
// //   //     .replace(/\-/g, "+")
// //   //     .replace(/_/g, "/");

// //   //   const rawData = atob(base64);
// //   //   const outputArray = new Uint8Array(rawData.length);

// //   //   for (let i = 0; i < rawData.length; ++i) {
// //   //     outputArray[i] = rawData.charCodeAt(i);
// //   //   }

// //   //   return outputArray;
// //   // };

// //   // const savesubscription = async (subscription) => {
// //   //   const response = await fetch("http://localhost:4000/save-subscription", {
// //   //     method: "POST",
// //   //     headers: {
// //   //       "Content-type": "application/json",
// //   //     },
// //   //     body: JSON.stringify(subscription),
// //   //   });
// //   //   return response.json();
// //   // };

// //   // // Subscribing for push notifications
// //   // try {
// //   //   const subscription = await self.registration.pushManager.subscribe({
// //   //     userVisibleOnly: true,
// //   //     applicationServerKey: urlBase64ToUint8Array(
// //   //       "BL0X_YqyqiPje-SJkUh863LgBp30kE6hbEZcUVUI2OeuzqKwY3GhvrqAqFSccRUejcU_5y3JGuRNHmqg1cx2V-Y"
// //   //     ),
// //   //   });
// //   //   //     Public Key:
// //   //   // BL0X_YqyqiPje-SJkUh863LgBp30kE6hbEZcUVUI2OeuzqKwY3GhvrqAqFSccRUejcU_5y3JGuRNHmqg1cx2V-Y
// //   //   // debugger;
// //   //   // Private Key:
// //   //   // LimCR1Fx9K0NyLoA78PcvXsNBL6lW5gtT242pOd6OuQ

// //   //   const reponse = await savesubscription(subscription);
// //   //   console.log("reponse:", reponse);
// //   // } catch (err) {
// //   //   console.error("Error subscribing to push notifications:", err);
// //   // }
// // });
// hi

// const CACHE_NAME = "version-1";
// const urlsToCache = [
//   "offline.html",
//   "_next/static/chunks/pages/settings.js",
//   "_next/static/chunks/pages/index.js",
//   "_next/static/chunks/main.js",
//   "_next/static/chunks/pages/_app.js",
//   "/",
//   "/favicon.ico",
//   "/settings",
//   "_next/static/chunks/react-refresh.js",
//   "_next/static/development/_buildManifest.js",
//   "_next/static/development/_ssgManifest.js",
//   "manifest.json",
//   "icons/icon-152x152.png",
//   "_next/static/chunks/webpack.js",
// ];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   const { request } = event;
//   const currentUrl = new URL(self.location);
//   const requestedUrl = new URL(request.url);
//   if (currentUrl.pathname === requestedUrl.pathname) {
//     return;
//   }

//   event.respondWith(
//     caches.match(request).then((cachedResponse) => {
//       if (cachedResponse) {
//         return cachedResponse; // Serve cached response if available
//       }

//       // If not cached, fetch from network
//       return fetch(request)
//         .then((networkResponse) => {
//           // Clone the response to use it twice
//           const responseToCache = networkResponse.clone();

//           // Check if the response is for the index or settings page
//           if (
//             request.url.endsWith("/settings") ||
//             request.url.endsWith("/index")
//           ) {
//             // Cache the response
//             caches.open(CACHE_NAME).then((cache) => {
//               cache.put(request, responseToCache);
//             });
//           }

//           return networkResponse;
//         })
//         .catch(() => {
//           // If fetch fails, respond with offline page
//           return caches.match("offline.html");
//         });
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   // Clearing old caches
//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         })
//       )
//     )
//   );
// });

const CACHE_NAME = "version-1";
const urlsToCache = [
  "offline.html",
  "service-worker.js",
  "firebase-messaging-sw.js",
  "_next/static/chunks/pages/settings.js",
  "_next/static/chunks/pages/camera.js",
  "_next/static/chunks/pages/index.js",
  "_next/static/chunks/main.js",
  "_next/static/chunks/pages/_app.js",
  "/",
  "/favicon.ico",
  "/settings",
  "/camera",
  "_next/static/chunks/react-refresh.js",
  "_next/static/development/_buildManifest.js",
  "_next/static/development/_ssgManifest.js",
  "manifest.json",
  "icons/icon-152x152.png",
  "_next/static/chunks/webpack.js",
  "_next/static/development/_devMiddlewareManifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  console.log("navigator.onLine", navigator.onLine);
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Serve cached response if available
        }

        // If not cached, fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Clone the response to use it twice
            const responseToCache = networkResponse.clone();

            // Check if the response is for the index or settings page
            if (
              request.url.endsWith("/settings") ||
              request.url.endsWith("/index")
            ) {
              // Cache the response
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseToCache);
              });
            }

            return networkResponse;
          })
          .catch(() => {
            // If fetch fails, respond with offline page
            return caches.match("offline.html");
          });
      })
    );
  }
});

self.addEventListener("activate", (event) => {
  // Clearing old caches
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener("push", (event) => {
  const data = event.data.json(); // Assuming the payload is in JSON format

  const options = {
    body: data.body,
    icon: "/path/to/your/icon.png",
    data: {
      url: data.link, // Customize the link to open when the notification is clicked
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
