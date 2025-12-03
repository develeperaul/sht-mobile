<template>
  <q-page class="tw-bg-blue_bg">
    <div class="tw-container">
      <TopBlock label="Вход в аккаунт" />

      <Form
        v-if="step === 1"
        @submit="submit"
        class="card-white tw-grid tw-gap-[23px] tw-mt-3 tw-content-start"
      >
        <div class="h2 tw-text-center">Введите номер телефона</div>
        <div class="p1 tw-text-center">Мы отправим код подтверждения</div>
        <div class="tw-grid tw-gap-3">
          <BaseInput
            v-model="phone"
            name="Телефон"
            un-mask
            maska="+7 (###)-###-##-##"
            placeholder="Телефон"
            type="tel"
            rules="required"
          />
        </div>
        <div class="p1 tw-text-center">
          <span>
            Нажимая на кнопку «Получить код», <br />
            я принимаю условия
          </span>
          <router-link class="link" :to="{ name: 'sogl' }"
            >Пользовательского соглашения</router-link
          >
          и
          <router-link class="link" :to="{ name: 'policy' }"
            >Политику конфиденциальности</router-link
          >
        </div>
        <BaseButton> Получить код </BaseButton>
      </Form>
      <Form
        v-if="step === 2"
        class="card-white tw-grid tw-gap-[23px] tw-mt-[32.5px]"
        @submit="auth"
      >
        <div class="h2 tw-text-center">Введите СМС код</div>
        <div class="p1 tw-text-center">
          Мы отправили код на номер <br />
          +7{{ phone }}
        </div>

        <div
          v-if="errorCode && !diabledBtn"
          class="tw-text-red p1 tw-text-center"
        >
          Код некорректный, попробуйте снова
        </div>
        <code-input
          class="tw-flex tw-justify-center"
          @filled="() => ((errorCode = false), (diabledBtn = false))"
          @unfilled="diabledBtn = true"
        />
        <div @click="step = 1" class="link p2 tw-text-center">
          Не получили код?
        </div>

        <BaseButton :disabled="diabledBtn"> Отправить </BaseButton>
      </Form>
    </div>
    <Teleport to="body">
      <Transition name="fade">
        <div class="popup" v-if="success">
          <div class="popup__wrapper">
            <div class="tw-bg-white tw-py-8 tw-px-5 tw-rounded-32">
              <div class="h2 tw-text-center tw-mb-4">У вас нет акккаунта</div>
              <div class="p1 tw-text-center tw-mb-4">
                Под этим номер не зарегистрирован аккаунт, зарегистрируйтесь или
                введите новый номер телефона
              </div>
              <BaseButton @click="router.push({ name: 'reg' })" class="">
                Зарегистрироваться
              </BaseButton>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </q-page>
</template>
<script setup lang="ts">
import { authSendCode, authVerify } from 'src/api/auth'
import { devices } from 'src/api/main'
import authStore from 'src/stores/authStore'
import { useRouter } from 'vue-router'
import { LocalStorage } from 'quasar'
import { resyncAfterAuth } from 'src/api/push'
const router = useRouter()

const phone = ref('')
const step = ref<1 | 2>(1)
const promo = ref('1234')
const diabledBtn = ref(true)
const success = ref(false)
const getCode = async () => {
  await authSendCode('+7' + phone.value)
}

const submit = async () => {
  try {
    await getCode()
    step.value = 2
  } catch (e) {
    if (e.response.status === 409 || e.response.status === 404) {
      success.value = true
    } else {
      throw e
    }
  }
}
const errorCode = ref(false)
const auth = async (vals: { kod: string }) => {
  try {
    await authStore().auth('+7' + phone.value, vals.kod)
    router.push({ name: 'home' })

    // if (window.localStorage.getItem('deviceTokenForPushNotification'))
    //   await devices(
    //     window.localStorage.getItem('deviceTokenForPushNotification')
    //   )
  } catch (e) {
    if (e.response.status === 500) {
      errorCode.value = true
    } else {
      throw e
    }
  }
}

const linkIsInBuffer = ref(false)

function copyRefLink() {
  navigator.clipboard.writeText(promo.value).then(() => {
    linkIsInBuffer.value = true
    setTimeout(() => (linkIsInBuffer.value = false), 1000 * 10)
  })
}
</script>
<style lang="scss" scoped></style>
