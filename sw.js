
const CACHE_NAME = "zerin-chat-v2";

const APP_FILES = [
  "/voice-club-bd/",
  "/voice-club-bd/index.html",
  "/voice-club-bd/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(async () => {
        return await caches.match("/voice-club-bd/") ||
          await caches.match("/voice-club-bd/index.html");
      })
    );
  }
});
