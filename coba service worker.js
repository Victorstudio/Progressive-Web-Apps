importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.setConfig({
   debug: false
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// set cache names
workbox.core.setCacheNameDetails({
   prefix: 'my',
   suffix: 'v1',
   precache: 'appshell',
});

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
   /^https:\/\/fonts\.googleapis\.com\css?family=Rubik+Mono+One/,
   /^https:\/\/fonts\.googleapis\.com\icon?family=Material+Icons/,
   workbox.strategies.staleWhileRevalidate({
     cacheName: 'google-fonts-stylesheets',
   })
 );

 // Menyimpan cache dari CDNJS
workbox.routing.registerRoute(
   /^https:\/\/cdnjs\.cloudflare\.com\ajax\libs\jquery\/3.1.1\jquery.min.js/,
   /^https:\/\/cdnjs\.cloudflare\.com\ajax\libs\gsap\/1.20.3\plugins\CSSPlugin.min.js/,
   /^https:\/\/cdnjs\.cloudflare\.com\ajax\libs\gsap\/1.20.3\easing\EasePack.min.js/,
   /^https:\/\/cdnjs\.cloudflare\.com\ajax\libs\gsap\/1.20.3\TweenLite.min.js/,
   /^https:\/\/cdnjs\.cloudflare\.com\ajax\libs\materialize\/1.0.0\js\materialize.min.js/,
   workbox.strategies.staleWhileRevalidate({
     cacheName: 'google-fonts-stylesheets',
   })
 );

// Precaching all assets first
// Automatic for event activite and fetch from cache
workbox.precaching.precacheAndRoute([
   'js/idb.js',
   'css/materialize.min.css',
   '/icon/1.webp',
   '/icon/2.webp',
   '/icon/3.webp',
   '/icon/4.webp',
   '/icon/icon.png',
   '/icon/icon72.png',
   '/icon/icon96.png',
   '/icon/icon192.png',
   '/icon/404.png',
   '/icon/icon180.png',
   '/icon/icon512.png',
   '/js/optionalscript.js',
   '/js/noback.js',
   '/js/show-on-scroll.js',
   '/js/scrollbar.js',
   '/js/text-animation.js',
   '/push.js',
   {
      url: 'index.html',
      revision: '1'
   },
   {
      url: 'nav.html',
      revision: '1'
   },
   {
      url: 'team.html',
      revision: '1'
   },
   {
      url: 'manifest.json',
      revision: '1'
   },
   {
      url: 'css/style.css',
      revision: '1'
   },
   {
      url: 'js/api.js',
      revision: '1'
   },
   {
      url: 'js/db.js',
      revision: '1'
   },
   {
      url: 'js/sw_detail.js',
      revision: '1'
   },
   {
      url: 'js/nav.js',
      revision: '1'
   },
   {
      url: 'js/sw_index.js',
      revision: '1'
   },
   {
      url: 'pages/home.html',
      revision: '1'
   },
   {
      url: 'pages/saved.html',
      revision: '1'
   }
], {
   // Ignore all URL parameters.
   ignoreURLParametersMatching: [/.*/],
});

// Clean Up Old Precaches
workbox.precaching.cleanupOutdatedCaches();

// Using stale while revalidate (Data API)
workbox.routing.registerRoute(
   new RegExp("https://api.football-data.org/v2/.+"),
   new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'data',
      plugins: [
         new workbox.expiration.Plugin({
            // Max 100 entries
            maxEntries: 100,
            // Max 7 days caching
            maxAgeSeconds: 7 * 24 * 60 * 60,
         }),
      ],
   })
);

// Push event for notification
self.addEventListener('push', function (event) {
   var body;
   if (event.data) {
      body = event.data.text();
   } else {
      body = 'Pesan default.';
   }
   var options = {
      body: body,
      icon: '/icon/icon512.png',
      vibrate: [100, 50, 100],
      data: {
         dateOfArrival: Date.now(),
         primaryKey: 1
      }
   };
   event.waitUntil(
      self.registration.showNotification('Pemberitahuan!', options)
   );
});