const CACHE_NAME = "spark-app-hub-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  // Add your apps' paths here!
  "./apps/pixelzap/index.html",
  "./apps/repix/index.html",
  "./apps/calc talk/index.html"
  "./apps/temp converter/index.html"
  "./apps/numlin/index.html"

];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
