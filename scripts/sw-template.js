// Service worker, generated into dist/sw.js by scripts/prerender.mjs.
// Pages: network first, falling back to the saved copy (or the app shell)
// when the network fails. Hashed assets: saved once, served from the phone.
const VERSION = '__VERSION__'
const PRECACHE = __PRECACHE__
const APP = `app-${VERSION}`
const PAGES = 'pages'
const MEDIA = 'media'
// Saved files are matched by URL alone: module scripts send an Origin header
// that precached copies lack, which some hosts list in `Vary`.
const ANY = { ignoreSearch: true, ignoreVary: true }

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(APP)
      // One file failing must not stop the rest from being saved.
      .then((cache) => Promise.all(PRECACHE.map((url) => cache.add(url).catch(() => {}))))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('app-') && k !== APP).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

// Browsers refuse a redirected response for a page load (e.g. a host that
// adds a trailing slash), so serve a plain copy of it instead.
const plain = (res) => (res.redirected ? new Response(res.body, { status: res.status, statusText: res.statusText, headers: res.headers }) : res)

// Waits for the network, but gives up after `ms` when a saved copy exists.
function networkFirst(request, cacheName, ms) {
  return caches.open(cacheName).then((cache) =>
    cache.match(request, ANY).then((saved) => {
      const live = fetch(request).then((response) => {
        const res = plain(response)
        if (res.ok) cache.put(request, res.clone())
        return res
      })
      if (!saved) return live
      const timeout = new Promise((resolve) => setTimeout(() => resolve(saved), ms))
      return Promise.race([live.catch(() => saved), timeout])
    }),
  )
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(
      networkFirst(request, PAGES, 4000).catch(() =>
        caches.match(request, ANY).then((page) => page || caches.match('/404.html')),
      ),
    )
    return
  }

  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request, { ignoreVary: true }).then(
        (saved) =>
          saved ||
          fetch(request).then((res) => {
            if (res.ok) caches.open(APP).then((cache) => cache.put(request, res.clone()))
            return res
          }),
      ),
    )
    return
  }

  if (/^\/(images|art)\/|^\/(icon-|favicon|manifest)/.test(url.pathname)) {
    event.respondWith(
      caches.open(MEDIA).then((cache) =>
        cache.match(request, { ignoreVary: true }).then((saved) => {
          const live = fetch(request)
            .then((res) => {
              if (res.ok) cache.put(request, res.clone())
              return res
            })
            .catch(() => saved)
          return saved || live
        }),
      ),
    )
  }
})
