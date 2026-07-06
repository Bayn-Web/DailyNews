const CACHE_NAME = 'dailynews-v1'

self.addEventListener('install', event => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(['/']).catch(() => {})
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      )
    })
  )
})

self.addEventListener('fetch', event => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== location.origin) return
  if (url.pathname.startsWith('/@vite/') || url.pathname.startsWith('/@react-refresh')) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        const clone = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
        return response
      }).catch(() => caches.match(request))
    )
    return
  }

  event.respondWith(
    caches.match(request).then(cached => {
      return cached || fetch(request).then(response => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
        }
        return response
      })
    }).catch(() => caches.match(request))
  )
})
