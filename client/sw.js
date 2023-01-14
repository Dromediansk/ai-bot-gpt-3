// Check if the service worker is already registered
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function (registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );

        // Listen for the "controllerchange" event
        registration.addEventListener("controllerchange", function () {
          // Use a new service worker
          window.location.reload();
        });

        // Listen for the "updatefound" event
        registration.addEventListener("updatefound", function () {
          // A new service worker is available
          var newWorker = registration.installing;

          newWorker.addEventListener("statechange", function () {
            // If the new service worker is "installed", show a notification
            if (newWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                // Show the notification
                var notification = new Notification(
                  "A new version of this site is available. Click to update."
                );

                // Update the site when the notification is clicked
                notification.onclick = function () {
                  window.location.reload();
                };
              }
            }
          });
        });
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}
