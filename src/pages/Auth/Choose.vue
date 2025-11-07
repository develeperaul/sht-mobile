<template>
  <q-page class="tw-grid tw-bg-geen_btn">
    <div
      class="tw-container tw-grid tw-content-between tw-grid-rows-[1fr_auto]"
    >
      <div>
        <base-icon name="splash" class="tw-w-[332px] tw-h-[100%] tw-mx-auto" />
      </div>
      <div class="tw-grid tw-content-end">
        <div class="tw-grid tw-justify-items-center">
          <base-icon name="sht" class="tw-h-12" />
          <div class="p2">Твой путеводитель в мир путешествий</div>
        </div>

        <div class="tw-py-8 tw-grid tw-gap-2">
          <base-button
            class="!tw-bg-gray_main !tw-text-white"
            @click="router.push({ name: 'reg' })"
            >Зарегистрироваться</base-button
          >
          <base-button
            @click="router.push({ name: 'login' })"
            class="!tw-bg-transparent"
            >Войти в аккаунт</base-button
          >
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const phone = ref('')
const step = ref<1 | 2>(1)
const promo = ref('1234')
const diabledBtn = ref(true)
const submit = (vals) => {}

const linkIsInBuffer = ref(false)

function copyRefLink() {
  navigator.clipboard.writeText(promo.value).then(() => {
    linkIsInBuffer.value = true
    setTimeout(() => (linkIsInBuffer.value = false), 1000 * 10)
  })
}
</script>
<style lang="scss" scoped></style>
