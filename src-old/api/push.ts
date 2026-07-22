import { api } from './index'
import { LocalStorage } from 'quasar'

const DEVICE_ID_KEY = 'device_id'
const FIREBASE_TOKEN_KEY = 'firebase_token'

export function setDeviceId(id: string) {
  LocalStorage.set(DEVICE_ID_KEY, id)
}

export function getDeviceId() {
  return LocalStorage.getItem(DEVICE_ID_KEY)
}

export async function registerDevice(id: string) {
  try {
    await api.mainKy.post('devices', {
      json: { device_id: id },
    })
  } catch (e) {
    console.error('Device register error:', e)
  }
}

export async function syncFirebaseToken(firebaseToken: string) {
  const deviceId = getDeviceId()
  if (!deviceId) {
    console.warn('No device id, cannot sync firebase token')
    return
  }

  LocalStorage.set(FIREBASE_TOKEN_KEY, firebaseToken)

  try {
    await api.mainKy.put('firebase', {
      json: {
        device_token: deviceId,
        firebase_token: firebaseToken,
      },
    })
  } catch (e: any) {
    if (e?.response?.status === 404) {
      await api.mainKy.post('firebase', {
        json: {
          device_token: deviceId,
          firebase_token: firebaseToken,
        },
      })
    } else {
      console.error('syncFirebaseToken error:', e)
    }
  }
}

export async function resyncAfterAuth() {
  const token = LocalStorage.getItem(FIREBASE_TOKEN_KEY)
  if (token) await syncFirebaseToken(token)
}
