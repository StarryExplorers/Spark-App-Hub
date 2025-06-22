const CACHE_NAME = "spark-app-hub-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",

  // ✅ Corrected paths with commas
  "./apps/pixelzap/index.html",
  "./apps/repix/index.html",
  "./apps/calc talk/index.html",
  "./apps/temp converter/index.html",
  "./apps/numlin/index.html"
];

self.addEventListener("install", event => {
  console.log("[SW] Installing and caching Spark-App-Hub files");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Optional but good for instant updates
});

self.addEventListener("activate", event => {
  console.log("[SW] Activating and cleaning up old caches");
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log(`[SW] Deleting old cache: ${key}`);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control immediately
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("message", event => {
  if (event.data && event.data.action === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
