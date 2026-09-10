const CACHE_NAME = "tabbara-seafood-pos-v5";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js"
];

// ================================
// INSTALL
// ================================
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  // تشغيل النسخة الجديدة فوراً
  self.skipWaiting();
});

// ================================
// ACTIVATE
// ================================
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // السيطرة على الصفحات المفتوحة
  self.clients.claim();
});

// ================================
// FETCH
// ================================
self.addEventListener("fetch", function (event) {
  // نهمل أي طلب ليس GET
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  // لا نخزن أي طلب خارجي مثل Supabase
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  // ================================
  // HTML
  // Network First
  // ================================
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          const copy = response.clone();

          caches.open(CACHE_NAME).then(function (cache) {
            cache.put("./index.html", copy);
          });

          return response;
        })
        .catch(function () {
          return caches.match("./index.html");
        })
    );

    return;
  }

  // ================================
  // JavaScript / CSS
  // Network First
  // ================================
  const pathname = requestUrl.pathname;

  const isAppFile =
    pathname.endsWith("/script.js") ||
    pathname.endsWith("/style.css") ||
    pathname.endsWith("/sw.js");

  if (isAppFile) {
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          if (response && response.status === 200) {
            const copy = response.clone();

            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, copy);
            });
          }

          return response;
        })
        .catch(function () {
          return caches.match(event.request);
        })
    );

    return;
  }

  // ================================
  // باقي الملفات
  // Cache First
  // ================================
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(function (networkResponse) {
        if (
          !networkResponse ||
          networkResponse.status !== 200
        ) {
          return networkResponse;
        }

        const copy = networkResponse.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, copy);
        });

        return networkResponse;
      });
    })
  );
});
