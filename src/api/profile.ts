import { DataObj } from 'src/models/api'
import { api, apiAuth } from './index'
import { ProfileT, UpdateProfileT } from 'src/models/api/profile'

export const getProfile = (): Promise<DataObj<ProfileT>> => {
  return api.mainKy('profile/me').json()
}

export const updateProfile = (
  obj: UpdateProfileT
): Promise<DataObj<ProfileT>> => {
  return api.mainKy
    .post('profile/update', {
      json: obj,
    })
    .json()
}

export const uploadFile = (file: File): Promise<DataObj<{ id: string }>> => {
  const body = new FormData()
  body.append('media', file)
  return api.mainKy.post('profile/upload-temporary-file', { body }).json()
}
