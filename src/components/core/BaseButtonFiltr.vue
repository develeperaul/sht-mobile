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
    theme?: 'bg'
    size?: string
    load?: boolean
  }>(),
  {
    theme: 'bg',
  }
)
</script>
<style lang="scss" scoped>
.btn {
  @apply tw-flex tw-gap-2 tw-bg-white tw-items-center tw-justify-center  tw-cursor-pointer tw-font-normal p1;
  border-radius: 60px;
  height: 38px;
  padding-inline: 12px;
  &_lg {
    height: 40px;
  }
  &.active {
    @apply tw-bg-geen_btn;
  }
  &:active {
    @apply tw-bg-blue_main;
  }

  &:disabled {
    @apply tw-bg-blue_bg;
    color: #16161633;
  }
}
</style>
