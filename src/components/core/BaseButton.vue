<template>
  <button class="btn" :class="[`btn_${theme}`, size ? `btn_${size}` : '']">
    <template v-if="load">
      <q-spinner-tail color="white" />
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    theme?: 'bg' | 'border' | 'black'
    size?: 'sm'
    load?: boolean
  }>(),
  {
    theme: 'bg',
  }
)
</script>
<style lang="scss" scoped>
.btn {
  @apply tw-flex tw-gap-2  tw-items-center tw-justify-center  tw-w-full tw-cursor-pointer tw-font-semibold;
  border-radius: 90px;
  height: 60px;
  font-size: 16px;
  line-height: 20px;
  padding-inline: 30px;
  &_bg {
    @apply tw-bg-geen_btn;
    &:active {
      @apply tw-bg-gray_main tw-text-white;
    }
    &:disabled {
      @apply tw-bg-blue_bg;
      color: #16161633;
    }
  }
  &_border {
    @apply tw-text-blue_link tw-outline tw-outline-blue_link tw-outline-[1px];
    offset: 1px;
  }
  &_black {
    @apply tw-bg-gray_main tw-text-white;
  }
}
</style>
