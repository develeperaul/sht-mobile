<template>
  <div class="count-block">
    <div class="btn" @click="emits('dec')">-</div>
    <div class="count">{{ count }}</div>
    <div class="btn" @click="emits('inc')">+</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  count: string | number
}>()
const emits = defineEmits<{
  (e: 'inc'): void
  (e: 'dec'): void
}>()
</script>
<style lang="scss" scoped>
.count-block {
  @apply tw-inline-flex tw-items-center tw-bg-blue_light tw-px-5 tw-gap-4;
  height: 60px;
  border-radius: 20px;
}
.count {
  @apply p1;
}
.btn {
  @apply tw-bg-blue_main tw-grid  tw-font-montserrat;
  font-size: 24px;
  line-height: 8px;
  width: 30px;
  height: 30px;
  border-radius: 9999px;
  padding: 8px;
  text-align: center;
}
</style>
