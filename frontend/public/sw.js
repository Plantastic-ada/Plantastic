self.addEventListener("install", (_event) => {
  console.log("Service Worker: Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  event.waitUntil(self.clients.claim());
});

// @TODO implements other events listeners