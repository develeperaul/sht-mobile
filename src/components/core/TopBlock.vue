<template>
  <div class=" tw-relative tw-flex tw-justify-center tw-items-center tw-min-h-[44px]">
    <BaseIcon @click="router.go(-1)" name="arrowleft" class=" tw-w-6 tw-h-6 tw-text-gray_icon tw-absolute tw-left-0 tw-top-1/2 tw-transform -tw-translate-y-1/2"/>
    <div class="p1">
      {{ label }}
    </div>
  </div>
</template>
<script setup lang='ts'>
import { useRouter } from 'vue-router';

const props = defineProps<{
    label: string
}>()

  const router = useRouter()
</script>
<style lang='scss' scoped> 
</style>