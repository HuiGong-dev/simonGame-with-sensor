self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./fonts/press-start-2p-v9-latin-regular.eot", "./src/styles.css","./src/jquery.min.js", "./src/app.js", "./icons/manifest-icon-192.maskable.png"]);
        })
    );
});

self.addEventListener("fetch", e => {
    //console.log(`Intercepting fetch request for: ${e.request.url}`);
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch (e.request);
        })
    );
});