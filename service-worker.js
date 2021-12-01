/* global self, caches, fetch */
/* eslint-disable no-restricted-globals */

const CACHE = 'cache-386f274';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./krasosmutneni_001.html","./krasosmutneni_002.html","./krasosmutneni_003.html","./krasosmutneni_005.html","./krasosmutneni_006.html","./krasosmutneni_007.html","./krasosmutneni_008.html","./krasosmutneni_009.html","./krasosmutneni_010.html","./krasosmutneni_012.html","./krasosmutneni_011.html","./krasosmutneni_013.html","./krasosmutneni_014.html","./krasosmutneni_015.html","./krasosmutneni_016.html","./krasosmutneni_017.html","./krasosmutneni_018.html","./krasosmutneni_019.html","./krasosmutneni_020.html","./krasosmutneni_021.html","./krasosmutneni_022.html","./krasosmutneni_023.html","./krasosmutneni_024.html","./krasosmutneni_025.html","./krasosmutneni_026.html","./krasosmutneni_027.html","./krasosmutneni_029.html","./manifest.json","./resources.html","./resources/image001_fmt.png","./resources/image002_fmt.png","./resources/index.xml","./resources/kocka_fmt.png","./resources/obalka_krasosmutneni_fmt.png","./resources/upoutavka_eknihy_fmt.png","./scripts/bundle.js","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
