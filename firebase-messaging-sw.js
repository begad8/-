/* Mahami - Firebase Cloud Messaging service worker.
   Receives pushes while the site and the browser are closed and shows the notification. */
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
importScripts('./firebase-config.js'); // same public config the page uses

const cfg = self.MAHAMI_FIREBASE || {};
const ready = cfg.projectId && !String(cfg.projectId).startsWith('PASTE');

// Open (or focus) the app and show the task that the notification is about.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const taskId = (event.notification.data && event.notification.data.taskId) || '';
  const base = self.registration.scope; // works on GitHub Pages project sites (/repo/)
  const target = base + (taskId && taskId !== '_test' ? '#task=' + encodeURIComponent(taskId) : '');
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.startsWith(base) && 'focus' in c) {
          c.postMessage({ type: 'open-task', taskId });
          return c.focus();
        }
      }
      return self.clients.openWindow(target);
    }),
  );
});

if (ready) {
  firebase.initializeApp({
    apiKey: cfg.apiKey,
    projectId: cfg.projectId,
    messagingSenderId: cfg.messagingSenderId,
    appId: cfg.appId,
  });
  const messaging = firebase.messaging();

  // The server sends data-only messages, so the title and body are exactly what we chose.
  messaging.onBackgroundMessage((payload) => {
    const d = payload.data || {};
    return self.registration.showNotification(d.title || 'Mahami', {
      body: d.body || '',
      tag: d.tag || undefined, // same reminder never shows twice
      icon: './icon-192.png',
      badge: './badge-72.png',
      data: { taskId: d.taskId || '' },
      dir: 'auto',
      requireInteraction: false,
    });
  });
}
