import { boot } from "quasar/wrappers";
import { PushNotifications } from "@capacitor/push-notifications";
import { LocalStorage } from "quasar";
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  const addListeners = async () => {
    /**
     * Triggered automatically when app is open
     */
    await PushNotifications.addListener("registration", (token) => {
      if (token.value) {
        LocalStorage.set("deviceTokenForPushNotification", token.value);
        console.log("Device Registration Token", token.value);
      }
    });

    await PushNotifications.addListener("registrationError", (err) => {
      alert("Unable to Register your device for push notifications");
    });

    /**
     * Triggered when a new notification received
     */
    await PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        /**
         * Write logic to do something when a  new push notification received
         */
        console.log(notification, "notification received");
      }
    );

    /**
     * Triggered when click on a push notification from mobile notification bar
     */
    await PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification) => {
        /**
         * You can redirect to user to any page when push notification was clicked
         */
        // router.push('/notification-detail')
        console.log(notification, "Action performed JS");
      }
    );
  };

  const registerNotifications = async () => {
    /**
     * Check for permissions
     */
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === "prompt") {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== "granted") {
      // throw new Error('User denied permissions!');
      console.error("User denied permissions!");
    }

    await PushNotifications.register();
  };

  /**
   * Add all the event listeners
   */
  await addListeners();

  /**
   * Ask user for permissions and Register the device for the push notifications
   */
  await registerNotifications();
});
