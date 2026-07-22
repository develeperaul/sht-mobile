import { DataObj } from 'src/models/api'
import { api, apiAuth } from './index'

import { DataCreateFriendT, FriendT } from 'src/models/api/friend'

export const getFriends = (): Promise<DataObj<FriendT[]>> => {
  return api.mainKy('friends').json()
}

export const createFriend = (
  obj: DataCreateFriendT
): Promise<DataObj<FriendT>> => {
  return api.mainKy
    .post('friends', {
      json: obj,
    })
    .json()
}
export const updateFriend = (
  id: string,
  obj: DataCreateFriendT
): Promise<DataObj<FriendT>> => {
  return api.mainKy
    .put(`friends/${id}`, {
      json: obj,
    })
    .json()
}
export const deleteFriend = (id: string): Promise<DataObj<'OK'>> => {
  return api.mainKy.delete(`friends/${id}`).json()
}

// export const uploadFile = (file: File): Promise<DataObj<{ id: string }>> => {
//   const body = new FormData()
//   body.append('media', file)
//   return api.mainKy.post('profile/upload-temporary-file', { body }).json()
// }
