export type ProfileT = {
  phone: string
  email: string | null
  first_name: string | null
  last_name: string | null
  patronymic: string | null
  birthday: string | null
  avatar: { url: string; id: string } | null
  friends: []
}

export type UpdateProfileT = {
  phone: string
  first_name: string
  last_name: string
  patronymic: string
  birthday: string
  email?: string
  avatar_id?: string
}
