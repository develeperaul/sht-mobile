import { boot } from 'quasar/wrappers'
import { Capacitor } from '@capacitor/core'
import { PushNotifications } from '@capacitor/push-notifications'
import { Device } from '@capacitor/device'
import { setDeviceId, registerDevice, syncFirebaseToken } from 'src/api/push'

export default boot(async () => {
  if (!Capacitor.isNativePlatform()) return

  await PushNotifications.createChannel({
    id: 'fcm_default_channel',
    name: 'General Notifications',
    description: 'General app notifications',
    importance: 4,
    vibration: true,
    sound: 'default',
  })

  PushNotifications.addListener('registration', async (token) => {
    console.log('Firebase token:', token.value)
    await syncFirebaseToken(token.value)
  })

  PushNotifications.addListener('registrationError', (err) => {
    console.error('Push registration error:', err)
  })

  PushNotifications.addListener('pushNotificationReceived', (notif) => {
    console.log('Push received:', notif)
  })

  PushNotifications.addListener('pushNotificationActionPerformed', (notif) => {
    console.log('Push action performed:', notif)
  })

  const { identifier } = await Device.getId()
  setDeviceId(identifier)
  await registerDevice(identifier)

  let perm = await PushNotifications.checkPermissions()
  if (perm.receive !== 'granted') {
    perm = await PushNotifications.requestPermissions()
    if (perm.receive !== 'granted') return
  }

  await PushNotifications.register()
})
