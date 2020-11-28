/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
/* eslint-disable max-len */
const CACHE_NAME = 'football-v1';
const urlsToCache = [
  '/',
  'nav.html',
  'index.html',
  'article.html',
  'pages/home.html',
  'pages/saved.html',
  'manifest.json',
  'css/materialize.css',
  'css/materialize.min.css',
  'js/materialize.min.js',
  'js/materialize.js',
  'js/nav.js',
  'js/api.js',
  'js/db.js',
  'js/idb.js',
  'js/sw.js',
  'push.js',
  'img/icon-192x192.png',
  'img/icon-256x256.png',
  'img/icon-384x384.png',
  'img/icon-512x512.png',
  'img/logo.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('fetch', (event) => {
  const base_url = 'https://api.football-data.org/v2/';
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => fetch(event.request).then((response) => {
        cache.put(event.request.url, response.clone());
        return response;
      })),
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then((response) => response || fetch(event.request)),
    );
  }
});

self.addEventListener('push', (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheName != CACHE_NAME) {
          console.log(`ServiceWorker: cache ${cacheName} dihapus`);
          return caches.delete(cacheName);
        }
      }),
    )),
  );
});
