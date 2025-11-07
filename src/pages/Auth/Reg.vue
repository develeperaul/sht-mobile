<template>
  <q-page class="tw-bg-blue_bg">
    <div class="tw-container">
      <TopBlock label="Регистрация" />

      <Form
        v-if="step === 1"
        @submit="submit"
        class="card-white tw-grid tw-gap-[23px] tw-mt-3"
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
            Нажимая на кнопку «Получить код», <br />
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
      <div v-if="step === 3" class="card-white tw-grid tw-gap-[23px]">
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
          class="tw-flex tw-justify-between tw-items-center tw-rounded-[100px] tw-border-blue_bg tw-border-[3px] tw-bg-blue_bg tw-font-medium tw-pl-3"
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
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { regSendCode, regVerify } from 'src/api/auth'
import authStore from 'src/stores/authStore'

import { useRouter } from 'vue-router'

const router = useRouter()

const fields = ref({
  name: '',
  phone: "",
})

const step = ref<1 | 2 | 3>(1)
const promo = ref('1234')
const diabledBtn = ref(true)

const getCode =  async() => {
  await regSendCode('+7'+fields.value.phone)
}

const submit =  async() => {
  try {
    await getCode();
    step.value = 2
  } catch (e) {
    throw e
  }
 }
const auth =  async(vals: { kod: string }) => {
  try {
    authStore().reg(fields.value.name,'+7'+fields.value.phone,vals.kod)
    
    router.push({name:'home'})
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
      setTimeout(() => (linkIsInBuffer.value = false), 1000 * 10)
    })
}
</script>
<style lang="scss" scoped></style>
