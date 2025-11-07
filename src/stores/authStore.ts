// import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import { DataVal } from 'src/models'
import { regVerify, authVerify } from 'src/api/auth'
import { StoriesT, StoryT, StoryGroupT } from 'src/models/api/main'
import { setTokensData, cleanTokensData } from 'src/api/tokens'
import profileStore from './profileStore'

export default defineStore('auth', () => {
  const auth = async (phone: string, code: string) => {
    try {
      const { token } = await authVerify(phone, code)
      setTokensData(token, 30)
      await profileStore().setProfile()
    } catch (e) {
      throw e
    }
  }
  const reg = async (name: string, phone: string, code: string) => {
    try {
      const { token } = await regVerify(name, phone, code)
      setTokensData(token, 30)
      await profileStore().setProfile()
    } catch (e) {
      throw e
    }
  }

  const logout = async () => {
    cleanTokensData()

    window.location.reload()
  }

  // end сторисы

  // end карточка мастера
  return {
    logout,
    auth,
    reg,
  }
})
