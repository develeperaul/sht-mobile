<template>
  <div class="count-block">
    <div class="btn btn-remove" @click="emits('dec')"></div>
    <div class="count">{{ count }}</div>
    <div class="btn btn-add" @click="emits('inc')"></div>
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
  @apply tw-bg-blue_main tw-grid tw-relative;
  font-size: 24px;
  line-height: 23px;
  width: 30px;
  height: 30px;
  border-radius: 9999px;
  padding: 8px;
  text-align: center;
  &-remove::before {
    content: '-';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &-add::before {
    content: '+';
    position: absolute;
    top: calc(50% + 1px);
    left: calc(50% - 1px);
    transform: translate(-50%, -50%);
  }
}
</style>
