<template>
  <q-page class="tw-grid bg-main env-b" :style="{backgroundImage: `url(main.png)`}">
    <div
      class="tw-container tw-grid tw-content-between tw-grid-rows-[1fr_auto]"
    >
      <div class="tw-absolute tw-left-5 tw-top-0 env-t ">
        <div
          @click="router.push({ name: 'home' })"
          class="tw-rounded-full tw-w-8 tw-h-8 tw-bg-white tw-grid tw-place-content-center glass-w"
        >
          <BaseIcon name="arrowleft" class="tw-w-6 tw-h-6" />
        </div>
      </div>

      <div class=" tw-relative tw-grid tw-grid-rows-[1fr_auto]">
        <div class="tw-grid tw-justify-items-center tw-content-center tw-translate-y-[80px]">
          <base-icon name="sht2" class="tw-h-[83px]" />
          <div class="p2 tw-text-white tw-ml-[90px] tw-mt-2.5">Твой путеводитель в <br> мир путешествий</div>
        </div>

        <div class="tw-py-8 tw-grid tw-gap-2">
          <!-- <base-button
            class="!tw-bg-gray_main !tw-text-white"
            @click="router.push({ name: 'reg' })"
            >Зарегистрироваться</base-button
          > -->
          <base-button
            @click="router.push({ name: 'login' })"
            class=" tw-mx-2.5 tw-my-8"
            style=" width: inherit;"
            >Авторизоваться</base-button
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
<style lang="scss" scoped>
.bg-main {
  background-repeat: no-repeat;
  background-size: 1200px 1315px;

  background-position: center center;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: linear-gradient(180deg, rgba(255, 255, 255, 0) 50.09%, #EAF0FF 100%);
    backdrop-filter: blur(10.899999618530273px)
  }

}
</style>
