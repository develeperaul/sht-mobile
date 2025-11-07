export type StoriesT = {
  id: number
  // title: string
  // published_at: string
  // unpublished_at: string
  // context_image: {
  //   id: number
  //   path: string
  //   width: string
  //   height: string
  //   url: string
  // }
  image: {
    // id: number
    // path: string
    // width: string
    // height: string
    url: string
  } | null
}

export type StoryT = {
  id: number
  title: string
  description: string
  // action: boolean
  // division: boolean
  image: {
    id: number
    path: string
    width: string
    height: string
  } | null
}

export type StoryGroupT = {
  [key: string]: StoryT[]
}

export type DirectionT = {
  id: string
  background: null | { url: string }
  name: string
  title: string
  offers_min_price: string
  offers_min_start_date: string
  offers_max_end_date: string
  min_date: string
}

export type FilterT = {
  years: number[]
  months: string[]
  directions: {
    locals: { name: string }[]
    foreign: { name: string }[]
  }
  prices: {
    min: string
    max: string
  }
  types: [
    {
      value: string
      title: string
      image: string
    },
  ]
}

export type DirectionCardT = {
  id: string
  background: null | { url: string }
  name: string
  title: string
  preview_stories: StoriesT[]
  video_url: string | null
  dates: { [key: string]: string[] }
  rating: string
  services: ServiceT[]
  locations: {
    id: string
    name: string
  }[]
  additional_info: {
    id: string
    name: string
  }[]
  questions: {
    id: string
    question: string
    answer: string
  }[]
  hotels: HotelT[]
}

export type HotelT = {
  description: string
  images: { url: string }[]
  name: string
  rating: string
}

export type ServiceT = {
  id: string
  description: string
  type: 'transport' | 'power_supply'
  slider: { url: string }[]
}

export type OfferT = {
  id: string
  start_date: string
  end_date: string
  prepay: string
  price: string
  operator: string
  description: string
  is_weekend: boolean
}
export interface OfferCardT extends OfferT {
  direction: {
    id: string
    background: null | { url: string }
    name: string
    title: string
    video_url: string
  }
}
export interface OfferCardList {
  id: string
  offer: OfferCardT
  status:
    | 'fresh'
    | 'pending'
    | 'paid'
    | 'cancelled'
    | 'completed'
    | 'waiting_review'
  chat_url: null | string
  contract_url: null | string
  payment_url: null | string
  voucher_url: null | string
  tickets: []
}

export type PromoT = {
  id: string
  code: string
  discount: string
}
