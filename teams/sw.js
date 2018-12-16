self.addEventListener("install", function(e) {
	e.waitUntil(
		caches.open("dl-teams").then(function(cache) {
			return cache.addAll(["./", "./index.html", "./style.css"]);
		})
	);
});

self.addEventListener("activate", function(event) {
	console.log("Activated sw.js", event);
});

self.addEventListener("fetch", function(event) {
	console.log(event.request.url);

	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});
