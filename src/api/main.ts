import { DataObj } from 'src/models/api'
import { api, apiAuth } from './index'
import {
  DirectionSubgroupT,
  FilterT,
  OfferCardT,
  OfferT,
  PromoT,
  PromotionT,
  StoriesT,
  StoryT,
} from 'src/models/api/main'
import { DirectionT, DirectionCardT } from 'src/models/api/main'
import { json } from 'stream/consumers'
//сторисы

// Показывает список сторисов
export const stories = (): Promise<DataObj<StoriesT[]>> =>
  api.mainKy('preview-stories').json()

// Карточка сториса
export const story = (previev_story_id: number): Promise<DataObj<StoryT[]>> =>
  api.mainKy(`stories/${previev_story_id}`).json()

// Направления
export const getDirections = (obj?: {
  days_count_from?: null | number
  days_count_to?: null | number
  is_weekend?: boolean
  month?: null | string
  name?: null | string
  price_from?: string
  price_to?: string
  year?: null | string | number
  type?: null | string | number
}): Promise<DataObj<DirectionT[]>> => {
  if (obj) {
    let params = ''

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (params.length === 0) {
          params = `?${key}=${obj[key]}`
        } else {
          params = params + `&${key}=${obj[key]}`
        }
      }
    }
    return api.mainKy(`directions${params}`).json()
  } else {
    return api.mainKy('directions').json()
  }
}
export const getDirection = (
  uuid: string
): Promise<DataObj<DirectionCardT>> => {
  return api.mainKy(`directions/${uuid}`).json()
}
export const getDirectionSubgroup = (
  uuid: string,
  date?: string
): Promise<DirectionSubgroupT> => {
  if (date) return api.mainKy(`directions/${uuid}/subgroup?date=${date}`).json()
  else return api.mainKy(`directions/${uuid}/subgroup`).json()
}
export const getDirectionReview = (
  direciton_uuid: string,
  obj: {
    rating: number
    description?: string
    how_found_us?: string
    image_ids?: string[]
  }
): Promise<DataObj<'OK'>> => {
  return api.mainKy
    .post(`directions/${direciton_uuid}/reviews`, { json: obj })
    .json()
}
// Фильтры
export const getFilters = (): Promise<DataObj<FilterT>> =>
  api.mainKy('direction-filters').json()

export const getOffers = (
  direction_uuid: string,
  days: string,
  date: string
): Promise<DataObj<OfferT[]>> => {
  return api
    .mainKy(
      `directions/${direction_uuid}/offers?days_count=${days}&date=${date}`
    )
    .json()
}
export const getOffer = (uuid: string): Promise<DataObj<OfferCardT>> => {
  return api.mainKy(`offers/${uuid}`).json()
}
export const getPromotion = (): Promise<DataObj<PromotionT>> => {
  return api.mainKy('promotion').json()
}
export const getPromo = (): Promise<DataObj<PromoT>> => {
  return api.mainKy(`promotional-code`).json()
}
export const infoPromo = (code: string): Promise<DataObj<PromoT>> => {
  const body = new FormData()
  body.append('code', code)
  return api.mainKy.post(`promotional-code`, { body }).json()
}

export const deleteMedia = (id: string) => {
  return api.mainKy.delete(`media/${id}`).json()
}
export const devices = (id: string) => {
  console.log(id, 'test')

  return api.mainKy.post('devices', { json: { device_id: id } })
}
