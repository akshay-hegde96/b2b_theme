function exampleSWInstall(event) {
  // eslint-disable-next-line no-console
  /* const cacheName = 'vtexCustomCache';

  const cacheAssets = [
    '/'
  ];

  event.waitUntil (
    caches
      .open(cacheName)
      .then(cache => {
        console.log("Service Worker caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  ); */

  console.log('[example-sw] Install of service worker')
}

export default exampleSWInstall
