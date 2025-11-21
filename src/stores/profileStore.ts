// import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import { DataVal } from 'src/models'
import { getProfile, updateProfile } from 'src/api/profile'
import { setTokensData } from 'src/api/tokens'
import { ProfileT, UpdateProfileT } from 'src/models/api/profile'
import { resyncAfterAuth } from 'src/api/push'

export default defineStore('profile', () => {
  const profile = ref<ProfileT | null>(null)
  const setProfile = async () => {
    try {
      profile.value = (await getProfile()).data
    } catch (e) {
      throw e
    }
  }

  const update = async (obj: UpdateProfileT) => {
    try {
      const res = (await updateProfile(obj)).data
      profile.value = res
    } catch (e) {
      throw e
    }
  }

  watch(profile, async (val, oldVal) => {
    if (oldVal === null && val !== null) {
      try {
        await resyncAfterAuth()
      } catch (e) {
        throw e
      }
    }
  })
  // end сторисы

  // end карточка мастера
  return {
    profile,
    setProfile,
    update,
  }
})
