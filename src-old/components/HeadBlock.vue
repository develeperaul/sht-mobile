<template>
  <div
    class="tw-relative tw-flex tw-items-center tw-justify-center tw-min-h-[44px]"
  >
    <div
      @click="router.go(-1)"
      to="go(-1)"
      class="tw-absolute tw-left-0 tw-top-1/2 tw-transform -tw-translate-y-1/2"
    >
      <BaseIcon name="arrowleft" class="tw-w-6 tw-h-6" :class="iconColor" />
    </div>
    <div class="p1 tw-px-[44px] tw-text-center" :class="titleColor">
      {{ title }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  title: string
  theme?: string
}>()
const router = useRouter()
const iconColor = computed(() => {
  if (props.theme) {
    if (props.theme === 'white') {
      return 'tw-text-gray_main'
    }
  }
  return 'tw-text-gray_icon '
})
const titleColor = computed(() => {
  if (props.theme) {
    if (props.theme === 'white') {
      return 'tw-text-white'
    }
  }
  return
})
</script>
<style lang="scss" scoped></style>
