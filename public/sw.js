// Service Worker pour Diwaan Immo PWA
const CACHE_NAME = 'diwaan-immo-v2-prix-corriges'; // Version 2 avec prix corrigés
const urlsToCache = [
    '/',
    '/search',
    '/dashboard',
    '/legal-assistant',
    '/offline.html'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache ouvert');
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Suppression ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - retourner la réponse du cache
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    (response) => {
                        // Vérifier si réponse valide
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Cloner la réponse
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                ).catch(() => {
                    // Retourner page offline si pas de connexion
                    return caches.match('/offline.html');
                });
            })
    );
});

// Push notifications (optionnel)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'Nouvelle notification de Diwaan Immo',
        icon: '/icon-192x192.png',
        badge: '/icon-72x72.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Diwaan Immo', options)
    );
});
