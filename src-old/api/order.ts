import { DataObj } from 'src/models/api'
import { api, apiAuth } from './index'
import { OfferCardList } from 'src/models/api/main'

export const createWidthManager = (obj: {
  offer_id: string
  phone: string
  name: string
}): Promise<DataObj<'OK'>> => {
  const body = new FormData()
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key]
      if (Array.isArray(element)) {
        element.forEach((el) => {
          body.append(`${key}[]`, el)
        })
      } else {
        body.append(key, element)
      }
    }
  }
  return api.mainKy.post('orders/with-manager', { body }).json()
}

export const create = (obj: {
  friends: string[]
  offer_id: string
  promo_code?: string
  comment?: string
}): Promise<DataObj<'OK'>> => {
  // const body = new FormData()
  // for (const key in obj) {
  //   if (Object.prototype.hasOwnProperty.call(obj, key)) {
  //     const element = obj[key]
  //     if (Array.isArray(element)) {
  //       element.forEach((el) => {
  //         body.append(`${key}[]`, JSON.stringify(el))
  //       })
  //     } else {
  //       body.append(key, element)
  //     }
  //   }
  // }
  return api.mainKy.post('orders', { json: obj }).json()
}
export const getOrderList = (
  type: 'upcoming' | 'past'
): Promise<DataObj<OfferCardList[]>> => {
  return api.mainKy(`orders?type=${type}`).json()
}
export const getOrder = (uuid: string): Promise<DataObj<OfferCardList>> => {
  return api.mainKy(`orders/${uuid}`).json()
}

export const uploadTicket = (
  order_uuid: string,
  file: File
): Promise<DataObj<OfferCardList>> => {
  const body = new FormData()
  body.append('media', file)
  return api.mainKy.post(`orders/${order_uuid}/upload-ticket`, { body }).json()
}
