const cacheName = "hafiz-quest-shell-v3";
const shell = [
  "/", "/manifest.webmanifest",
  "/assets/ui-messages.js?v=5", "/assets/interface-language.js?v=2",
  "/assets/game-audio.js?v=3", "/assets/opening.js?v=4",
  "/assets/juz30-translation.js", "/assets/juz30-localized.js", "/assets/install.js",
  "/assets/icons/icon-192.png", "/assets/icons/icon-512.png", "/assets/icons/apple-touch.png",
  "/assets/audio/pembuka-alafasy.mp3", "/assets/audio/murajaah.mp3",
  ...["", "ar/", "en/"].flatMap(folder =>
    ["benar", "coba-lagi", "duel-keliru"].map(name => `/assets/audio/${folder}${name}.mp3`)
  ),
  ...[6231, 6232, 6233, 6234].map(n => `/assets/audio/duel/${n}.mp3`)
];
const shellPaths = new Set(shell);

self.addEventListener("install", event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(shell.map(url => new Request(url, { cache: "reload" })))));
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith("hafiz-quest-shell-") && key !== cacheName)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  const appNavigation = request.mode === "navigate" && ["/", "/index.html"].includes(url.pathname);
  const key = appNavigation ? "/" : url.pathname + url.search;
  if (!appNavigation && !shellPaths.has(key)) return;

  event.respondWith((async () => {
    try {
      return await fetch(request);
    } catch {
      const cache = await caches.open(cacheName);
      // A full cached response is valid for offline media startup when a range fetch fails.
      return await cache.match(key) ?? Response.error();
    }
  })());
});
