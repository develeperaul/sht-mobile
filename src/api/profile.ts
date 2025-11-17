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
export const updateProfilePhoto = (id: string): Promise<DataObj<ProfileT>> => {
  return api.mainKy
    .post(`profile/upload-file/${id}`, {
      json: { file_uuid: id },
    })
    .json()
}

export const uploadFile = (
  file: File
): Promise<DataObj<{ id: string; image: { id: string; url: string } }>> => {
  const body = new FormData()
  body.append('media', file)
  return api.mainKy.post('profile/upload-temporary-file', { body }).json()
}

export const verifyEmail = (
  email: string,
  code: string
): Promise<DataObj<'OK'>> => {
  const body = new FormData()
  body.append('email', email)
  body.append('code', code)
  return api.mainKy.post('profile/verifications/email', { body }).json()
}
export const verifyPhone = (
  phone: string,
  code: string
): Promise<DataObj<'OK'>> => {
  const body = new FormData()
  body.append('phone', phone)
  body.append('code', code)
  return api.mainKy.post('profile/verifications/phone', { body }).json()
}
