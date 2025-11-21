import { boot } from 'quasar/wrappers'
import { PushNotifications } from '@capacitor/push-notifications'
import { Device } from '@capacitor/device'
import { setDeviceId, registerDevice, syncFirebaseToken } from 'src/api/push'

export default boot(async () => {
  // получаем device_id только в Capacitor-режиме
  const { identifier } = await Device.getId()

  setDeviceId(identifier)

  // регистрируем устройство в backend
  await registerDevice(identifier)

  // разрешения
  let perm = await PushNotifications.checkPermissions()
  if (perm.receive !== 'granted') {
    const req = await PushNotifications.requestPermissions()
    if (req.receive !== 'granted') return
  }

  // регистрация пушей
  await PushNotifications.register()

  PushNotifications.addListener('registration', async (token) => {
    console.log(token)

    console.log('Firebase token:', token.value)
    await syncFirebaseToken(token.value)
  })

  PushNotifications.addListener('registrationError', (err) => {
    console.error('Push registration error:', err)
  })

  PushNotifications.addListener('pushNotificationReceived', (notif) => {
    console.log('Push received:', notif)
  })
})
