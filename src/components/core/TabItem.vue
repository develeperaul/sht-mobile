<template>
  <button class="tab" :class="theme ? theme : 'tw-bg-white'">
    <slot />
  </button>
</template>
<script lang="ts">
export default defineComponent({
  name: 'tab-item',
})
</script>
<script setup lang="ts">
const props = defineProps<{
  theme?: string
}>()
</script>
<style lang="scss" scoped>
.tab {
  @apply p1;

  border-radius: 30px;
  height: 46px;
  transition: all 0.3s ease-in-out;
  &.active {
    background: linear-gradient(0deg, #A7BEFD 3.89%, #72A5F6 79.63%);
    color: white;
    // @apply tw-bg-geen_btn;
  }
}
</style>
