<template>
  <q-page class="tw-bg-blue_bg">
    <div class="tw-container">
      <TopBlock label="Вход в аккаунт" />

      <Form
        v-if="step === 1"
        @submit="submit"
        class="card-white tw-grid tw-gap-[23px] tw-mt-3"
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
          <a class="link" href="/">Пользовательского соглашения</a>
          и
          <a class="link" href="/">Политику конфиденциальности</a>
          и
          <a class="link" href="/">Договор Оферты</a>
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
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { authSendCode, authVerify } from 'src/api/auth'
import authStore from 'src/stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()

const phone = ref('')
const step = ref<1 | 2>(1)
const promo = ref('1234')
const diabledBtn = ref(true)
const getCode = async () => {
  await authSendCode('+7' + phone.value)
}

const submit = async () => {
  try {
    await getCode()
    step.value = 2
  } catch (e) {
    throw e
  }
}
const auth = async (vals: { kod: string }) => {
  try {
    authStore().auth('+7' + phone.value, vals.kod)
    router.push({ name: 'home' })
  } catch (e) {
    throw e
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
