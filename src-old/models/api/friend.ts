export type FriendT = {
  id: string
  phone: null | string
  first_name: null | string
  last_name: null | string
  patronymic: null | string
  email: null | string
  birthday: null | string
  isChildren?: boolean
}

export type DataCreateFriendT = {
  phone: null | string
  first_name: null | string
  last_name: null | string
  patronymic: null | string
  // email: null | string
  birthday: null | string
}
