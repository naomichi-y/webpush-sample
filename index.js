navigator.serviceWorker.ready.then(function(serviceWorker) {
  serviceWorker.pushManager.getSubscription().then(function(subscription) {
    if (subscription === null) {
      serviceWorker.pushManager.subscribe({ userVisibleOnly: true })
      .then(function(subscription) {
        var postData = {
          endpoint: subscription.endpoint
        };

        fetch('/register.php', {
          method: 'POST',
          body: JSON.stringify({ endpoint: subscription.endpoint })
        }).then(function(response) {
          return response.json();
        }).then(function (json) {
          if (json.status === 201) {
            alert('Successful registration to Service worker.');
          } else {
            alert(json.errors[0].message);
          }
        }).catch(function(err) {
          alert(err);
        });
      }).catch(function(err) {
        alert(err);
      });
    }
  });
});

navigator.serviceWorker.register('/service-worker.js').then(function() {
  Notification.requestPermission();

  if (Notification.permission === 'denied') {
    alert('Notification is denied.');
  } else if (Notification.permission === 'granted') {
    alert('Notification is allowed.');
  }
});
