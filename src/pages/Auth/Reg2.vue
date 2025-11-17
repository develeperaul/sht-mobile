<template>
  <q-page class="tw-bg-blue_bg tw-grid">
    <div class="tw-container tw-grid tw-grid-rows-[auto_1fr]">
      <TopBlock label="Регистрация" />

      <Form
        v-if="step === 2"
        @submit="submit"
        class="card-white tw-grid tw-gap-[23px] tw-mt-3 tw-content-start tw-h-fit"
      >
        <div class="h2 tw-text-center">
          Введите имя <br />
          и номер телефона
        </div>
        <div class="p1 tw-text-center">Мы отправим код подтверждения</div>
        <div class="tw-grid tw-gap-3">
          <BaseInput v-model="fields.name" name="Имя" placeholder="Имя" rules="required" />
          <BaseInput v-model="fields.phone" name="Телефон" un-mask maska="+7 (###)-###-##-##" placeholder="Телефон" type="tel"  rules="required"/>
        </div>
        <div class="p1 tw-text-center">
          <span>
            Нажимая на кнопку «Получить код»,
            я принимаю условия
          </span>
          <a class="link" href="/">Пользовательского соглашения</a>
          и
          <a class="link" href="/">Политику конфиденциальности</a>
          и
          <a class="link" href="/">Договор Оферты</a>
        </div>
        <BaseButton type="submit"> Получить код </BaseButton>
        <div class="p2 tw-text-center">
          <p class="tw-text-gray_icon">Уже есть аккаунт?</p>
          <router-link :to="{ name: 'login'}" class="link"> Войти </router-link>
        </div>
      </Form>
      <Form
        v-if="step === 3"
        
        class="card-white tw-grid tw-gap-[23px] tw-mt-[32.5px] tw-content-start tw-h-fit"
        @submit="auth"
      >
        <div class="h2 tw-text-center">Введите СМС код</div>
        <div class="p1 tw-text-center">
          Мы отправили код на номер <br />
          +7{{ fields.phone }}
        </div>
        <code-input
          class="tw-flex tw-justify-center"
          @filled="diabledBtn = false"
          @unfilled="diabledBtn = true"
        />
        <div @click="step = 1" class="link p2 tw-text-center">
          Не получили код?
        </div>
        <BaseButton :disabled="diabledBtn"> Отправить </BaseButton>
      </Form>
      <div v-if="step === 1" class=" tw-grid tw-content-between tw-pb-10 tw-pt-10" >
        <div class="card-white tw-grid tw-gap-[23px]">

          <img
            src="~assets/img/1000.png"
            width="273"
            height="99"
            alt=""
            class="tw-mx-auto"
          />
          <div class="p1 tw-text-center">
            Поздравляем!
            <br />
            <br />
            Ваш промокод на 1000 рублей <br> для первого заказа. <br></br> Сохраните
            его и используйте, <br></br> чтобы получить скидку.
          </div>
          <div
            class="tw-flex tw-justify-between tw-items-center tw-rounded-[100px] tw-border-blue_bg tw-border-[3px] tw-bg-blue_bg tw-font-normal tw-pl-3"
          >
            1000START
            <div
              class="tw-bg-geen_btn tw-flex tw-gap-[15px] tw-items-center tw-rounded-[100px] tw-shrink-0 tw-py-[15px] tw-px-6"
              @click="copyRefLink"
            >
              <BaseIcon name="copy" class="tw-w-6 tw-h-6" />
              Скопировать
            </div>
          </div>
        </div>
        <BaseButton @click="step = 2" theme="black" class="">
          Далее
        </BaseButton>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div class="popup" v-if="success">
          <div class="popup__wrapper">
            <div class="tw-bg-white tw-py-8 tw-px-5 tw-rounded-32">
              <div class="h2 tw-text-center tw-mb-4">
                У вас уже есть акккаунт
              </div>
              <div class="p1 tw-text-center tw-mb-4">
                Под этим номер уже зарегистрирован аккаунт, войдите в профиль или введите новый номер телефона
              </div>
              <BaseButton @click="router.push({ name: 'login' })" class="">
                Войти
              </BaseButton>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </q-page>
</template>
<script setup lang="ts">
import { regSendCode, regVerify } from 'src/api/auth'
import authStore from 'src/stores/authStore'
import { LocalStorage } from 'quasar'
import { useRouter } from 'vue-router'
import { devices } from 'src/api/main'
import { Notify } from 'quasar'

const router = useRouter()
const success = ref(false)
const fields = ref({
  name: '',
  phone: "",
})

const step = ref<1 | 2 | 3>(1)
const promo = ref('1000START')
const diabledBtn = ref(true)

const getCode =  async() => {
  await regSendCode('+7'+fields.value.phone)
}

const submit =  async() => {
  try {
    await getCode();
    step.value = 3
  } catch (e) {
    if (e.response.status === 409) {
      success.value = true
    } else {
      
      throw e
    }
    
  }
 }
const auth =  async(vals: { kod: string }) => {
  try {
    await authStore().reg(fields.value.name,'+7'+fields.value.phone,vals.kod)
    router.push({name:'home'})
    if (window.localStorage.getItem('deviceTokenForPushNotification'))
      await devices(window.localStorage.getItem('deviceTokenForPushNotification'))
    
  } catch (e) {
    throw e
  }
 }

const linkIsInBuffer = ref(false)

function copyRefLink() {
  navigator.clipboard
    .writeText( promo.value)
    .then(() => {
      linkIsInBuffer.value = true
      Notify.create({
        type: 'positive',
        message: 'Промо скопирован',
        position: 'top',
      })
      setTimeout(() => {
        linkIsInBuffer.value = false
      }, 1000 * 10)
    })
}
</script>
<style lang="scss" scoped></style>
