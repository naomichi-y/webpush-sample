self.addEventListener('push', function(event) {
  event.waitUntil(
    self.registration.showNotification('Title', {
      body: 'Body'
    })
  )
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  clients.openWindow('/');
}, false);
