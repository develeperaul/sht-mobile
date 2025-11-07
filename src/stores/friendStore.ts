// import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import { DataVal } from 'src/models'
import {
  getFriends,
  createFriend,
  updateFriend,
  deleteFriend,
} from 'src/api/friend'
import { setTokensData } from 'src/api/tokens'

import { FriendT, DataCreateFriendT } from 'src/models/api/friend'

export default defineStore('friend', () => {
  const friends = ref<FriendT[]>([])
  const setFriends = async () => {
    try {
      friends.value = (await getFriends()).data
    } catch (e) {
      throw e
    }
  }

  const create = async (obj: DataCreateFriendT) => {
    try {
      const res = (await createFriend(obj)).data
      friends.value = [...friends.value, res]
    } catch (e) {
      throw e
    }
  }
  const update = async (id: string, obj: DataCreateFriendT) => {
    try {
      const res = (await updateFriend(id, obj)).data
      await setFriends()
    } catch (e) {
      throw e
    }
  }
  const remove = async (id: string) => {
    try {
      const res = (await deleteFriend(id)).data
      await setFriends()
    } catch (e) {
      throw e
    }
  }

  // const update = async (obj: UpdateProfileT) => {
  //   try {
  //     const res = (await updateProfile(obj)).data
  //     profile.value = res
  //   } catch (e) {
  //     throw e
  //   }
  // }

  // end сторисы

  // end карточка мастера
  return {
    friends,
    setFriends,
    create,
    update,
    remove,
  }
})
