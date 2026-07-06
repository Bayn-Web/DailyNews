const CACHE_NAME = "dailynews-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/"]).catch(() => {});
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)));
    }),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  const excludeGetRequestUrls = ["https://icanhazdadjoke.com/"];
  if (url.pathname.startsWith("/@vite/") || url.pathname.startsWith("/@react-refresh") || excludeGetRequestUrls.some((e) => url.href.includes(e))) return;

  if (url.origin === location.origin) {
    const isStaticAsset = /\.(html|js|css|png|jpg|jpeg|gif|svg|woff2?|ttf|eot)(\?.*)?$/i.test(url.pathname);

    if (request.mode === "navigate" || isStaticAsset) {
      event.respondWith(
        caches.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                const responseClone = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
              }
              return networkResponse;
            })
            .catch(() => {});

          return cachedResponse || fetchPromise;
        }),
      );
      return;
    }
  }
});
