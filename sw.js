const CACHE = "wrapper-v1";
const APP_SHELL = [
  "./","./index.html","./manifest.json",
  "./icons/icon-192.png","./icons/icon-256.png","./icons/icon-512.png"
];
self.addEventListener("install", e =>
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP_SHELL)))
);
self.addEventListener("activate", e =>
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))
  ))
);
self.addEventListener("fetch", e =>
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))
);
