<template>
  <q-page class="tw-container">
    <head-block title="Личные данные" class="tw-mb-3" />

    <div>
      <div>
        <div
          class="tw-flex tw-gap-2 tw-overflow-auto no-scrollbar tw-mb-6"
          @scroll="closePopup(guestActive)"
        >
          <div
            v-for="(g, index) in guests"
            class="p1 tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1 tw-rounded-[60px] tw-w-fit tw-shrink-0"
            :class="guestActive === index ? 'tw-bg-blue_main' : 'tw-bg-white'"
            @click="guestActive = index"
            @blur="closePopup(index)"
            :tabindex="-1"
          >
            Гость №{{ index + 1 }}
            <div class="edit-block">
              <BaseIcon
                @click="openPopup($event, index)"
                name="dots"
                class="tw-w-[27px] tw-h-[30px] tw-text-gray_main"
              />
              <div
                class="edit-block__popup"
                :class="g.open ? 'active' : ''"
                :style="{ left: `${popupConf.x}px` }"
              >
                <div
                  v-if="guestActive !== 0"
                  class="tw-flex tw-gap-2.5 tw-items-center tw-h-[50px] tw-px-5 round"
                  @click="removeGuest"
                >
                  <BaseIcon
                    name="trash"
                    class="tw-w-6 tw-h-6 tw-text-blue_icon"
                  />
                  Удалить гостя
                </div>
                <div
                  class="tw-flex tw-gap-2.5 tw-items-center tw-h-[50px] tw-px-5"
                  :class="
                    guestActive === 0
                      ? 'tw-rounded-[30px]'
                      : 'tw-bg-[#C6D9F166] tw-rounded-b-[30px]'
                  "
                  @click="editPopup(index)"
                >
                  <BaseIcon
                    name="edit"
                    class="tw-w-6 tw-h-6 tw-text-blue_icon"
                  />
                  Редактировать
                </div>
              </div>
            </div>
          </div>
          <div
            class="tw-w-[38px] tw-h-[38px] tw-rounded-full h2 tw-grid tw-place-content-center tw-bg-white tw-shrink-0"
            @click="addGuest"
          >
            +
          </div>
        </div>
      </div>
      <template v-for="(g, index) in guests">
        <template v-if="index === 0">
          <template v-if="guestActive === index">
            <Form
              @submit="updateData($event, index)"
              v-if="guests[guestActive]?.edit"
              class="tw-grid tw-gap-6"
            >
              <div>
                <div class="p1 tw-mb-[25px]">Фото</div>
                <File
                  @file-load="fileLoad"
                  @delete-file="deleteFile"
                  :id="profile.avatar ? profile.avatar.id : undefined"
                  :url="profile?.avatar ? profile?.avatar.url : undefined"
                />
                <!-- <BaseIcon name="image" class="tw-w-[120px] tw-h-[120px]" /> -->
              </div>
              <div>
                <div class="p1 tw-mb-[25px]">Контактная информация</div>
                <div class="tw-grid tw-gap-2" v-if="profile">
                  <BaseInput
                    :model-value="profile.phone ?? ''"
                    un-mask
                    maska="+7 (###)-###-##-##"
                    name="phone"
                    placeholder="Телефон"
                    rules="required|cellphone"
                  />
                  <BaseInput
                    :model-value="profile.email ?? ''"
                    name="email"
                    rules="required|email"
                    placeholder="Почта"
                  />
                </div>
              </div>
              <div>
                <div class="p1 tw-mb-[25px]">Контактная информация</div>
                <div class="tw-grid tw-gap-2">
                  <BaseInput
                    :model-value="profile?.first_name ?? ''"
                    name="last_name"
                    rules="required"
                    placeholder="Имя*"
                  />
                  <BaseInput
                    :model-value="profile?.last_name ?? ''"
                    name="first_name"
                    rules="required"
                    placeholder="Фамилия*"
                  />
                  <BaseInput
                    :model-value="profile?.patronymic ?? ''"
                    name="patronymic"
                    rules="required"
                    placeholder="Отчество*"
                  />
                  <BaseInput
                    :model-value="profile?.birthday ?? ''"
                    name="birthday"
                    maska="##.##.####"
                    rules="required"
                    placeholder="Дата рождения*"
                  />
                </div>
              </div>
              <BaseButton>Сохранить</BaseButton>
            </Form>
            <div v-else class="tw-grid tw-gap-6">
              <div>
                <div class="p1 tw-mb-[25px]">Фото</div>
                <!-- {{ profile.avatar }} -->

                <File
                  @file-load="fileLoad"
                  :id="avatar_id ?? profile.avatar.id"
                  :url="profile?.avatar ?? ''"
                />
              </div>
              <div>
                <div class="p1 tw-mb-[25px]">Контактная информация</div>
                <div class="tw-grid tw-gap-2">
                  <div
                    v-if="profile?.phone"
                    class="p1 tw-rounded-[60px] tw-bg-white tw-h-[52px] tw-px-4 tw-flex tw-items-center"
                  >
                    {{ profile.phone }}
                  </div>
                  <div
                    v-if="profile?.email"
                    class="p1 tw-rounded-[60px] tw-bg-white tw-h-[52px] tw-px-4 tw-flex tw-items-center"
                  >
                    {{ profile.email }}
                  </div>
                </div>
              </div>
              <div>
                <div class="p1 tw-mb-[25px]">Контактная информация</div>
                <div class="tw-grid tw-gap-2">
                  <div
                    v-if="profile?.last_name"
                    class="p1 tw-rounded-[60px] tw-bg-white tw-h-[52px] tw-px-4 tw-flex tw-items-center"
                  >
                    {{ profile.last_name }}
                  </div>
                  <div
                    v-if="profile?.first_name"
                    class="p1 tw-rounded-[60px] tw-bg-white tw-h-[52px] tw-px-4 tw-flex tw-items-center"
                  >
                    {{ profile.first_name }}
                  </div>
                  <div
                    v-if="profile?.patronymic"
                    class="p1 tw-rounded-[60px] tw-bg-white tw-h-[52px] tw-px-4 tw-flex tw-items-center"
                  >
                    {{ profile.patronymic }}
                  </div>
                  <div
                    v-if="profile?.birthday"
                    class="p1 tw-rounded-[60px] tw-bg-white tw-h-[52px] tw-px-4 tw-flex tw-items-center"
                  >
                    {{ profile.birthday }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>
        <template v-else>
          <template v-if="guestActive === index">
            <template v-if="friends && friends[index - 1]">
              <Form
                @submit="updateGuest($event, index - 1)"
                v-if="guests[guestActive]?.edit"
                class="tw-grid tw-gap-6"
              >
                <div>
                  <div class="p1 tw-mb-[25px]">Контактная информация</div>
                  <div class="tw-grid tw-gap-2" v-if="profile">
                    <BaseInput
                      :model-value="friends[index - 1].phone ?? ''"
                      un-mask
                      maska="+7 (###)-###-##-##"
                      name="phone"
                      placeholder="Телефон"
                    />
                  </div>
                </div>
                <div>
                  <div class="p1 tw-mb-[25px]">Контактная информация</div>
                  <div class="tw-grid tw-gap-2">
                    <BaseInput
                      :model-value="friends[index - 1]?.first_name ?? ''"
                      name="last_name"
                      rules="required"
                      placeholder="Имя*"
                    />
                    <BaseInput
                      :model-value="friends[index - 1]?.last_name ?? ''"
                      name="first_name"
                      rules="required"
                      placeholder="Фамилия*"
                    />
                    <BaseInput
                      :model-value="friends[index - 1]?.patronymic ?? ''"
                      name="patronymic"
                      rules="required"
                      placeholder="Отчество*"
                    />
                    <BaseInput
                      :model-value="friends[index - 1]?.birthday ?? ''"
                      name="birthday"
                      maska="##.##.####"
                      rules="required"
                      placeholder="Дата рождения*"
                    />
                  </div>
                </div>
                <BaseButton>Сохранить</BaseButton>
              </Form>
              <div v-else class="tw-grid tw-gap-6">
                <div>
                  <div class="p1 tw-mb-[25px]">Контактная информация</div>
                  <div class="tw-grid tw-gap-2">
                    <div
                      v-if="friends[index - 1]?.phone"
                      class="p1 tw-rounded-[60px] tw-bg-white tw-h-[52px] tw-px-4 tw-flex tw-items-center"
                    >
                      {{ friends[index - 1].phone }}
                    </div>
                  </div>
                </div>
                <div>
                  <div class="p1 tw-mb-[25px]">Контактная информация</div>
                  <div class="tw-grid tw-gap-2">
                    <div
                      v-if="friends[index - 1]?.last_name"
                      class="p1 tw-rounded-[60px] tw-bg-white tw-h-[52px] tw-px-4 tw-flex tw-items-center"
                    >
                      {{ friends[index - 1].last_name }}
                    </div>
                    <div
                      v-if="friends[index - 1]?.first_name"
                      class="p1 tw-rounded-[60px] tw-bg-white tw-h-[52px] tw-px-4 tw-flex tw-items-center"
                    >
                      {{ friends[index - 1].first_name }}
                    </div>
                    <div
                      v-if="friends[index - 1]?.patronymic"
                      class="p1 tw-rounded-[60px] tw-bg-white tw-h-[52px] tw-px-4 tw-flex tw-items-center"
                    >
                      {{ friends[index - 1].patronymic }}
                    </div>
                    <div
                      v-if="friends[index - 1]?.birthday"
                      class="p1 tw-rounded-[60px] tw-bg-white tw-h-[52px] tw-px-4 tw-flex tw-items-center"
                    >
                      {{ friends[index - 1].birthday }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <Form
                @submit="createGuest($event, index)"
                class="tw-grid tw-gap-6"
              >
                <div>
                  <div class="p1 tw-mb-[25px]">Контактная информация</div>
                  <div class="tw-grid tw-gap-2" v-if="profile">
                    <BaseInput
                      un-mask
                      maska="+7 (###)-###-##-##"
                      name="phone"
                      placeholder="Телефон"
                    />
                  </div>
                </div>
                <div>
                  <div class="p1 tw-mb-[25px]">Контактная информация</div>
                  <div class="tw-grid tw-gap-2">
                    <BaseInput
                      name="last_name"
                      rules="required"
                      placeholder="Имя*"
                    />
                    <BaseInput
                      name="first_name"
                      rules="required"
                      placeholder="Фамилия*"
                    />
                    <BaseInput
                      name="patronymic"
                      rules="required"
                      placeholder="Отчество*"
                    />
                    <BaseInput
                      name="birthday"
                      maska="##.##.####"
                      rules="required"
                      placeholder="Дата рождения*"
                    />
                  </div>
                </div>
                <BaseButton>Сохранить</BaseButton>
              </Form>
            </template>
          </template>
        </template>
      </template>
    </div>
    <VerifyMail
      v-model="isVerifyMail"
      :mail="updateMail"
      @update="isVerifyMail = false"
    />
    <VerifyPhone
      v-model="isVerifyPhone"
      :phone="updatePhone"
      @update="isVerifyPhone = false"
    />
  </q-page>
</template>
<script setup lang="ts">
import profileStore from 'src/stores/profileStore'
import { updateProfile, uploadFile, updateProfilePhoto } from 'src/api/profile'
import friendStore from 'src/stores/friendStore'
import { deleteMedia } from 'src/api/main'

const { profile } = storeToRefs(profileStore())
const { friends } = storeToRefs(friendStore())

onMounted(async () => {
  await Promise.allSettled([
    friendStore().setFriends(),
    profileStore().setProfile(),
  ])
})

watch(friends, (v) => {
  const count = friendStore().friends.length
  for (let i = 1; i <= count; i++) {
    guests.value.splice(i, 1, {
      open: false,
      trash: false,
      edit: false,
    })
  }
})
// const guests = computed(() => {
//   const count = friendStore().friends.length
//   const arr = [{ open: false, trash: false, edit: false }]
//   if (count > 0) {
//     for (let i = 0; i < count; i++) {
//       arr.push({ open: false, trash: false, edit: false })
//     }
//   }
//   return arr
// })
const guests = ref<{ open: boolean; trash: boolean; edit: boolean }[]>([
  { open: false, trash: false, edit: true },
])

// активный гость
const guestActive = ref(0)

// обновление статусов гостя при переключении таба
watch(guestActive, (v: number) => {
  guests.value.splice(v, 1, {
    open: false,
    trash: false,
    edit: false,
  })
})

const open = ref(true)

const popupConf = ref<{ x: number; y: number }>({
  x: 0,
  y: 0,
})
// действия с попапом
const openPopup = (e: Event, index: number) => {
  const el = e.target
  console.log(el.getBoundingClientRect())

  popupConf.value = {
    x: el.getBoundingClientRect().left,
    y: el.getBoundingClientRect().top,
  }
  guests.value.splice(index, 1, {
    open: true,
    trash: false,
    edit: false,
  })
}
const closePopup = (index: number) => {
  guests.value.splice(index, 1, {
    open: false,
    trash: false,
    edit: false,
  })
}
const editPopup = (index: number) => {
  guests.value.splice(index, 1, {
    open: false,
    trash: false,
    edit: true,
  })
}

// добавления гостя
const addGuest = () => {
  guests.value.push({ open: false, trash: false, edit: false })
  guestActive.value = guests.value.length - 1
}
const isVerifyMail = ref(false)
const isVerifyPhone = ref(false)
const updateMail = ref('')
const updatePhone = ref('')
//обновление профиля
const updateData = async (vals: {
  phone: string
  first_name: string
  last_name: string
  patronymic: string
  birthday: string
  email: string
}) => {
  await profileStore().update({ ...vals, phone: '+7' + vals.phone })
  console.log(
    profile.value?.email !== vals.email ||
      (profile.value?.email === null && vals.email !== null)
  )

  if (
    profile.value?.email !== vals.email &&
    vals.email !== null &&
    vals.email.length > 0
  ) {
    console.log(vals.email.length > 0)

    updateMail.value = vals.email
    isVerifyMail.value = true
  }

  if (
    profile.value?.phone !== '+7' + vals.phone &&
    vals.phone !== null &&
    vals.phone.length > 0
  ) {
    updatePhone.value = vals.phone
    isVerifyPhone.value = true
  }
}

//создание гостя
const createGuest = (vals: {
  phone: string
  first_name: string
  last_name: string
  patronymic: string
  birthday: string
}) => {
  friendStore()
    .create({ ...vals, phone: '+7' + vals.phone })
    .then((e) => {
      friendStore().setFriends()
    })
}
//обновление гостя
const updateGuest = async (vals: {
  phone: string
  first_name: string
  last_name: string
  patronymic: string
  birthday: string
}) => {
  if (guestActive.value !== 0 && friends.value.length > 0) {
    const friend = friends.value[guestActive.value - 1]

    if (friend) {
      console.log(vals)
      await friendStore().update(friend.id, {
        ...vals,
        phone: '+7' + vals.phone,
      })
    }
  }
}
// удаление гостя
const removeGuest = async () => {
  if (guestActive.value !== 0 && friends.value.length > 0) {
    const friend = friends.value[guestActive.value - 1]
    if (friend) {
      await friendStore().remove(friend.id)
      guests.value.splice(guestActive.value, 1)
      guestActive.value = guests.value.length - 1
    }
  }
}

// работа с файлом
const avatar_id = ref<string>('')
//загрузка файла
const fileLoad = async (file: File) => {
  try {
    avatar_id.value = (await uploadFile(file)).data.id
    profile.value = (await updateProfilePhoto(avatar_id.value)).data
  } catch (e) {
    throw e
  }
}
const deleteFile = async (id: string) => {
  try {
    await deleteMedia(id)
    await profileStore().setProfile()
    avatar_id.value = ''
  } catch (e) {
    throw e
  }
}
</script>
<style lang="scss" scoped>
.edit-block {
  position: relative;
}
.edit-block__popup {
  display: none;
  position: fixed;
  backdrop-filter: blur(6px);
  border-radius: 30px;
  background: rgba(250, 250, 250, 0.4);
  transform: translateX(-24px);
  z-index: 2;
  &::before {
    content: '';
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    position: absolute;
    top: -8px;
    left: 30px;
    width: 16px;
    height: 8px;
    background: rgba(250, 250, 250, 0.4);
    display: block;
  }
  &.active {
    display: block;
  }
}
</style>
