import { DataObj } from 'src/models/api'
import { api, apiAuth } from './index'

export const authSendCode = (phone: string): Promise<DataObj<'ok'>> => {
  return apiAuth.mainKy
    .post('auth/send-code', { json: { phone: phone } })
    .json()
}
export const authVerify = (
  phone: string,
  code: string
): Promise<{ data: 'ok'; token: string }> => {
  return apiAuth.mainKy
    .post('auth/verify-code', { json: { phone: phone, code: code } })
    .json()
}

export const regSendCode = (phone: string): Promise<DataObj<'ok'>> => {
  return apiAuth.mainKy
    .post('registrations/send-code', { json: { phone: phone } })
    .json()
}

export const regVerify = (
  name: string,
  phone: string,
  code: string
): Promise<{ data: 'ok'; token: string }> => {
  return apiAuth.mainKy
    .post('registrations/verify-code', {
      json: { name: name, phone: phone, code: code },
    })
    .json()
}
