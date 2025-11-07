<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="popup" v-if="model">
        <div class="popup__wrapper">
          <BaseIcon
            name="close"
            class="popup__close tw-mr-0 tw-ml-auto"
            @click="model = false"
          />
          <div class="popup__content">
            <div class="tw-font-semibold tw-text-center tw-mb-4">
              Напишите нам в tg-канал
            </div>
            <div class="p2 tw-mb-8">
              Наш отдел заботы ответит вам в течение суток
            </div>
            <BaseButton>
              <a href="/"> Написать в поддержку </a>
            </BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
const model = defineModel()
</script>
<style lang="scss" scoped>
.popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #16161699;
  &__wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #ffffff;
    padding: 24px;
    @apply tw-rounded-t-32;
  }
  &__close {
    color: #949494;
    width: 24px;
    height: 24px;
  }
}
.review {
  &__title {
    @apply h2 tw-font-bold  tw-text-center;
  }
  &__input {
    @apply tw-bg-blue_bg p2 tw-outline-none;
    height: 117px;
    width: 100%;
    border-radius: 32px;
    padding: 20px;
    &::placeholder {
      @apply tw-text-black p2;
    }
  }
}
</style>
