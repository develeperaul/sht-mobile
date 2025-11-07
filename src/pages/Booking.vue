<template>
  <q-page class="tw-container">
    <template v-if="step2 > 2">
      <head-block title="Оплата" class="tw-mb-3" />
      <div class="tw-grid tw-gap-2">
        <div
          class="tw-rounded-32 tw-grid tw-gap-[35px] tw-overflow-hidden tw-relative tw-text-white tw-p-5"
          v-if="currentOffer.data"
        >
          <img
            :src="currentOffer.data.direction.background.url"
            alt=""
            class="tw-absolute tw-w-full tw-h-full tw-object-cover"
          />
          <div class="h2 tw-relative"></div>
          <div class="h1 tw-relative">
            {{
              `${dayjs(currentOffer.data.start_date).locale('ru').format('D MMMM')} - ${dayjs(currentOffer.data.end_date).locale('ru').format('D MMMM')} `
            }}
            ( {{ diff }})
          </div>
        </div>
        <div class="tw-bg-white tw-rounded-32 tw-p-5" v-if="guests.length > 0">
          <div class="h3 tw-mb-4">Гости</div>
          <div v-for="(value, index) in guests">
            <div
              class="p1 tw-px-3 tw-py-[8.5px] tw-bg-blue_light tw-mb-3 tw-rounded-[60px] tw-w-fit"
            >
              Гость №{{ index + 1 }}
            </div>
            <div class="p1 tw-mb-2">
              {{ value.last_name }} {{ value.first_name }}
              {{ value.patronymic }}
            </div>
            <div class="p1">{{ value.birthday }}</div>
          </div>
          <div
            v-if="index > 1"
            class="tw-border-b tw-border-blue_bg tw-py-6"
          ></div>
          <!-- <div>
            
            <div
              class="p1 tw-px-3 tw-py-[8.5px] tw-bg-blue_light tw-mb-3 tw-rounded-[60px] tw-w-fit"
            >
              Гость №1
            </div>
            <div class="p1 tw-mb-2">Богданов Евгений Александрович</div>
            <div class="p1">01.05.1985</div>
          </div> -->
        </div>

        <div class="tw-bg-white tw-rounded-32 tw-px-5 tw-py-[50px] tw-relative">
          <svg
            class="tw-absolute tw-top-0 tw-left-1/2 tw-transform -tw-translate-x-1/2"
            width="58"
            height="29"
            viewBox="0 0 58 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29 2.54707e-06C45.0163 1.84697e-06 58 -6.27912e-07 58 -6.27912e-07C58 16.0163 45.0163 29 29 29C12.9837 29 -5.67537e-07 16.0163 -1.26763e-06 1.90735e-06C-1.26763e-06 1.90735e-06 12.9837 3.24716e-06 29 2.54707e-06Z"
              fill="#E5EEF9"
            />
          </svg>
          <svg
            class="tw-absolute tw-bottom-0 tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-rotate-180"
            width="58"
            height="29"
            viewBox="0 0 58 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29 2.54707e-06C45.0163 1.84697e-06 58 -6.27912e-07 58 -6.27912e-07C58 16.0163 45.0163 29 29 29C12.9837 29 -5.67537e-07 16.0163 -1.26763e-06 1.90735e-06C-1.26763e-06 1.90735e-06 12.9837 3.24716e-06 29 2.54707e-06Z"
              fill="#E5EEF9"
            />
          </svg>

          <div class="tw-mb-[52px]">
            <div class="h3 tw-mb-4">Общая стоимость</div>
            <div class="tw-grid tw-gap-4 p1">
              <div class="tw-flex tw-justify-between tw-items-center">
                <div>Гость №1</div>
                <div v-amount-pretty="currentOffer.data?.price"></div>
              </div>
              <div class="tw-flex tw-justify-between tw-items-center">
                <div>Итого</div>
                <div v-amount-pretty="summ"></div>
              </div>
            </div>
          </div>
          <div class="tw-mb-[46px]">
            <div
              class="tw-flex tw-items-center tw-justify-between tw-bg-blue_light tw-rounded-[60px] tw-border-[3px] tw-border-blue_light tw-pl-4"
            >
              <input
                type="text"
                v-model="code"
                class="p2 tw-outline-none tw-border-none tw-bg-blue_light tw-h-auto tw-w-full"
                :class="{ 'tw-text-red': !promo }"
              />
              <!-- <div class="p2">1000START</div> -->
              <base-button class="!tw-w-fit" @click="searchPromo">
                Применить
              </base-button>
            </div>
            <div
              v-if="!promo"
              class="tw-text-red p3 tw-text-center tw-mt-[13px]"
            >
              Промокод не действителен
            </div>
          </div>

          <div class="h3 tw-flex tw-justify-between tw-items-center">
            <div>Предоплата</div>
            <div v-amount-pretty="currentOffer.data?.prepay"></div>
          </div>
        </div>
        <textarea
          name="comment"
          v-model="comment"
          class="tw-bg-white tw-rounded-32 tw-p-5 placeholder:tw-text-[#16161680] tw-w-full tw-min-h-[126px] tw-border-none tw-outline-none p1"
          placeholder="Оставьте пожелания. Например, одиночное размещение в номере или особенности в питании."
        >
        </textarea>
        <div class="tw-bg-white tw-rounded-32 tw-p-5 tw-relative">
          <div class="h3 tw-mb-3">Подтверждение менеджером</div>
          <div class="p1">
            Для бронирования тура с вами свяжется отдел заботы, чтобы обсудить
            детали поездки
          </div>
        </div>
        <BaseButton @click="create"> Подать заявку </BaseButton>
      </div>
    </template>
    <template v-else>
      <head-block title="Бронирование" class="tw-mb-3" />
      <div>
        <tab-head v-model="tab" :options="tabs" class="tw-mb-6" />
        <tab-body v-model="tab">
          <tab-content name="manager">
            <Form
              v-if="step === 1"
              @submit="submit"
              class="tw-bg-white tw-py-8 tw-px-5 tw-rounded-32"
            >
              <div class="h2 tw-text-center tw-mb-6">
                Оставьте контактные <br />
                данные
              </div>
              <div class="p1 tw-text-center tw-mb-6">
                Наш менеджер с вами свяжется
              </div>
              <div class="tw-grid tw-gap-3 tw-mb-6">
                <!-- <BaseInput
                  :model-value="profile.email ?? ''"
                  name="email"
                  placeholder="Почта"
                /> -->
                <BaseInput
                  :model-value="profile?.first_name ?? ''"
                  name="name"
                  placeholder="Наталья"
                />

                <BaseInput
                  :model-value="profile.phone ?? ''"
                  name="phone"
                  placeholder="+7 999 999 99 99"
                  un-mask
                  maska="+7 (###)-###-##-##"
                />
              </div>
              <div class="p1 tw-text-center tw-mb-6">
                <span>
                  Нажимая на кнопку «Оставить заявку», <br />
                  я принимаю условия
                </span>
                <a class="link" href="/">Пользовательского соглашения</a>
                и
                <a class="link" href="/">Политику конфиденциальности</a>
                и
                <a class="link" href="/">Договор Оферты</a>
              </div>
              <BaseButton> Оставить заявку </BaseButton>
            </Form>
            <div
              v-if="step === 2"
              class="tw-bg-white tw-py-8 tw-px-5 tw-rounded-32"
            >
              <div class="h2 tw-object-center tw-mb-4">
                Заявка отправлена 💌
              </div>
              <div class="p1 tw-text-center tw-mb-4">
                Мы уже всё получили. В ближайшее время с вами свяжется менеджер
                из нашей команды.
              </div>
              <BaseButton @click="router.push({ name: 'home' })" class="">
                На главную
              </BaseButton>
            </div>
          </tab-content>
          <tab-content name="other">
            <div
              class="tw-bg-white tw-py-5 tw-px-5 tw-rounded-32"
              v-if="currentOffer.data"
            >
              <div class="tw-flex tw-gap-[3px] tw-mb-6">
                <div
                  class="tw-rounded-[12px] tw-h-[5px] tw-w-full"
                  :class="step2 === 1 ? ' tw-bg-blue_icon' : 'tw-bg-blue_bg'"
                ></div>
                <div
                  class="tw-rounded-[12px] tw-h-[5px] tw-w-full"
                  :class="step2 === 2 ? ' tw-bg-blue_icon' : 'tw-bg-blue_bg'"
                ></div>
              </div>
              <div v-if="step2 === 1">
                <div class="h2 tw-mb-6">Дата и стоимость</div>
                <div>
                  <div class="p1 tw-mb-4">Выбранная дата</div>
                  <div class="h2">
                    {{
                      `${dayjs(currentOffer.data.start_date).locale('ru').format('DD MMMM')}-${dayjs(currentOffer.data.end_date).locale('ru').format('DD MMMM')}`
                    }}
                  </div>
                </div>
                <div class="tw-border-b-blue_bg tw-border-b tw-my-6"></div>
                <div class="tw-mb-6">
                  <div class="p1 tw-mb-3">Количество человек</div>
                  <count-block
                    :count="guestsCount"
                    @inc="addGuest"
                    @dec="removeGuest"
                  />
                </div>
                <div>
                  <label class="checkbox">
                    <input
                      v-model="checkedChildren"
                      type="checkbox"
                      hidden
                      value="1"
                    />
                    <span> Я буду с ребенком</span>
                  </label>
                </div>
                <div class="tw-mt-6" v-if="checkedChildren">
                  <div class="p1 tw-mb-4">Сколько детей?</div>
                  <div class="p3 tw-text-[#16161680] tw-mb-3">
                    В этом направлении можно брать детей возрастом от 10 лет
                  </div>
                  <count-block
                    :count="childs"
                    @inc="addChild"
                    @dec="removeChild"
                  />
                </div>
                <div class="tw-border-b-blue_bg tw-border-b tw-my-6"></div>
                <div>
                  <div class="p1 tw-mb-3">Общая стоимость</div>
                  <div class="h3" v-amount-pretty="summ"></div>
                </div>
                <BaseButton class="tw-mt-6" @click="step2 = 2">
                  Продолжить
                </BaseButton>
              </div>
              <template v-if="step2 === 2">
                <Form
                  v-slot="{ handleSubmit, resetForm }"
                  @submit="createGuest"
                >
                  <div class="h2 tw-mb-6">Гость №{{ editFriendCount + 1 }}</div>
                  <div class="tw-grid tw-gap-6" v-if="editFriendCount === 0">
                    <div>
                      <div class="p1 tw-mb-4">Контактная информация</div>
                      <div class="tw-grid tw-gap-2">
                        <BaseInput
                          :model-value="profile?.phone ?? ''"
                          name="phone"
                          placeholder="Номер для связи*"
                          un-mask
                          maska="+7 (###)-###-##-##"
                          rules="required|cellphone"
                        />
                        <BaseInput
                          :model-value="profile?.email ?? ''"
                          name="email"
                          placeholder="Электронная почта"
                          rules="required|email"
                        />
                      </div>
                    </div>
                    <div>
                      <div class="p1 tw-mb-4">Персональные данные</div>
                      <div class="tw-grid tw-gap-2">
                        <BaseInput
                          :model-value="profile?.last_name ?? ''"
                          name="last_name"
                          placeholder="Фамилия"
                          rules="required"
                        />
                        <BaseInput
                          :model-value="profile?.first_name ?? ''"
                          name="first_name"
                          placeholder="Имя"
                          rules="required"
                        />
                        <BaseInput
                          :model-value="profile?.patronymic ?? ''"
                          name="patronymic"
                          placeholder="Отчество"
                        />
                        <BaseInput
                          :model-value="profile?.birthday ?? ''"
                          name="birthday"
                          maska="##.##.####"
                          placeholder="Дата рождения"
                          rules="required|dateformat"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="tw-grid tw-gap-6" v-else>
                    <div>
                      <div class="p1 tw-mb-4">Персональные данные</div>
                      <div class="tw-grid tw-gap-2">
                        <BaseInput
                          name="last_name"
                          placeholder="Фамилия"
                          rules="required"
                        />
                        <BaseInput
                          name="first_name"
                          placeholder="Имя"
                          rules="required"
                        />
                        <BaseInput name="patronymic" placeholder="Отчество" />
                        <BaseInput
                          name="birthday"
                          maska="##.##.####"
                          placeholder="Дата рождения"
                          rules="required|dateformat"
                        />
                      </div>
                    </div>
                  </div>
                  <BaseButton class="tw-mt-6"> Продолжить </BaseButton>
                </Form>
              </template>
            </div>
          </tab-content>
        </tab-body>
      </div>
    </template>
    <Teleport to="body">
      <Transition name="fade">
        <div class="popup" v-if="success">
          <div class="popup__wrapper">
            <div class="tw-bg-white tw-py-8 tw-px-5 tw-rounded-32">
              <div class="h2 tw-object-center tw-mb-4">
                Заявка отправлена 💌
              </div>
              <div class="p1 tw-text-center tw-mb-4">
                Мы уже всё получили. В ближайшее время с вами свяжется менеджер
                из нашей команды.
              </div>
              <BaseButton @click="router.push({ name: 'home' })" class="">
                На главную
              </BaseButton>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </q-page>
</template>

<script setup lang="ts">
import { getOffer, infoPromo } from 'src/api/main'
import { OfferT, PromoT } from 'src/models/api/main'
import ordersStore from 'src/stores/ordersStore'
import directionsStore from 'src/stores/directionsStore'

import dayjs from 'dayjs'
import profileStore from 'src/stores/profileStore'
import { createFriend } from 'src/api/friend'
import { FriendT } from 'src/models/api/friend'
import { createWidthManager } from 'src/api/order'
import { useRouter } from 'vue-router'

const { profile } = storeToRefs(profileStore())
const props = defineProps<{
  uuid: string
}>()

const { currentOffer } = storeToRefs(directionsStore())

const router = useRouter()
const tab = ref('manager')
const tabs = [
  {
    id: 'manager',
    name: 'С менеджером',
  },
  {
    id: 'other',
    name: 'Самостоятельно',
  },
]

const step = ref(1)
const success = ref(false)
const submit = async (vals: { phone: string; name: string }) => {
  try {
    await createWidthManager({
      offer_id: props.uuid,
      phone: `+7${vals.phone}`,
      name: vals.name,
    })
    success.value = true
  } catch (e) {
    throw e
  }
}

const step2 = ref(1)

const phone = ref('')
const guestsCount = ref(1)
const guests = ref<FriendT[]>([])
const editFriendCount = ref(0)
// добавления гостя
const addGuest = () => {
  guestsCount.value = guestsCount.value + 1
}
// удаление гостя
const removeGuest = () => {
  if (guestsCount.value > 1) guestsCount.value = guestsCount.value - 1
}

const checkedChildren = ref(false)
const childs = ref(0)

//создание гостя
const createGuest = async (
  vals: {
    phone: string
    first_name: string
    last_name: string
    patronymic: string
    birthday: string
  },
  actions
) => {
  if (editFriendCount.value < guestsCount.value + childs.value) {
    try {
      const res = (await createFriend({ ...vals, phone: '+7' + vals.phone }))
        .data

      guests.value = [...guests.value, res]
      // if (editFriendCount.value == 0) {
      //   await profileStore().update({ ...vals, phone: '+7' + vals.phone })
      // } else {
      //   const res = (await createFriend({ ...vals })).data

      //   guests.value = [...guests.value, res]
      // }
      editFriendCount.value = editFriendCount.value + 1
      actions.resetForm()
      if (editFriendCount.value === guestsCount.value + childs.value)
        step2.value = 3
    } catch (e) {
      throw e
    }
  }
}

// добавления гостя
const addChild = () => {
  childs.value = childs.value + 1
}
// удаление гостя
const removeChild = () => {
  if (childs.value > 1) childs.value = childs.value - 1
}

const create = async () => {
  const guestsId = guests.value.map((g) => {
    return { id: g.id }
  })
  try {
    await ordersStore().createOrder({
      friends: guestsId,
      offer_id: props.uuid,
      promo_code: promo.value ? code.value : '',
      comment: comment.value,
    })
    success.value = true
  } catch (e) {
    throw e
  }
}

const summ = computed(() => {
  if (currentOffer.value.data) {
    return (
      (guestsCount.value + childs.value) * Number(currentOffer.value.data.price)
    )
  }
})

onMounted(async () => {
  if (currentOffer.value.data === null)
    currentOffer.value.data = (await getOffer(props.uuid)).data
})

//
const promo = ref<PromoT | boolean>(true)
const code = ref<string>('')
const searchPromo = () => {
  infoPromo(code.value)
    .then((r) => {
      promo.value = r.data
    })
    .catch(() => {
      promo.value = false
    })
}

const comment = ref('')

const diff = computed(() => {
  let d = 0

  if (currentOffer.value.data)
    d = dayjs(currentOffer.value.data.end_date)
      .locale('ru')
      .diff(currentOffer.value.data.start_date, 'day', true)

  return `${d} ${
    Number(d) == 1 ? 'день' : Number(d) >= 2 && Number(d) <= 4 ? 'дня' : 'дней'
  }`
})
</script>
