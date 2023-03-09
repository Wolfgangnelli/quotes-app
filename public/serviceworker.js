// create a cache name (cache stands for the storage of the browser)
const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"]; // offline represent the page we want to show when the app has no interner connection

/* cache stands for the storage of the browser so if we load something once if you make a request for for example if you load the image
 we don't have to reload the image every time we go online we can just take it from the cache, it's faster and more effective */

const self = this; // SW

// Install SW
self.addEventListener("install", (event) => {
  // open the cache and add the html files to the cache
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  // we need to do something with the requests after we listen for them
  // so we want to respond with something when we notice a fetch request and the thing that we are going to respond with is caches that match we
  // first want to match the vent that requests
  event.respondWith(
    caches
      .match(event.request) // we match all the requests that our page is receiving (example req to show image, api call)
      .then(() => {
        // for each request simply want to return a fetch of that specific request
        return fetch(event.request) // fetch them again
          .catch(() => caches.match("offline.html")); // if it cannot fetch the data (there is no internet connection), return offline html file
      })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  // we are often going to have lot of versions of our cash
  // in activation we are actually going to remove all the previous caches and just keep the new one
  const cahceWhitelist = [];
  cahceWhitelist.push(CACHE_NAME);

  event.waitUntil(
    // we wait until we get caches that keys
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheNames.includes(cacheName)) {
            return caches.delete(cacheName); // delete this specific cache name
          }
          return cacheName;
        })
      )
    )
  );
  // in this case i keeping only the specific cache version i need
});
