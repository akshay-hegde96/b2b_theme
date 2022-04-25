function exampleSWFetch(event) {
  // eslint-disable-next-line no-console
  console.log('[example-sw] Fetch of service - worker');
 /*  event.respondWith(
    caches.match(event.request)
      .then(cacheRes => {
        return cacheRes || fetch(event.request);
      })
  ) */
}

export default exampleSWFetch
