var message = document.querySelector('#message');

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
        }).then(function(json) {
          if (json.status === 201) {
            message.innerText = 'Successful registration to Service worker.';
          } else {
            message.innerText = json.errors[0].message;
          }
        }).catch(function(err) {
          message.innerText = err;
        });
      }).catch(function(err) {
        message.innerText = err;
      });
    }
  });
});

navigator.serviceWorker.register('/service-worker.js').then(function() {
  Notification.requestPermission();

  if (Notification.permission === 'denied') {
    message.innerText = 'Notification is denied.';
  } else if (Notification.permission === 'granted') {
    message.innerText = 'Notification is allowed.';
  }
});

var pushNotification = document.querySelector('#push_notification');

pushNotification.addEventListener('click', function() {
  fetch('/push_worker.php', {
    method: 'POST'
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    if (json.status === 201) {
      message.innerText = json.message;
    } else {
      message.innerText = json.errors[0].message;
    }
  }).catch(function(err) {
    message.innerText = err;
  });
});
