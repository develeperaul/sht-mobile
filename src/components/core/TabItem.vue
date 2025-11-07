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
    @apply tw-bg-geen_btn;
  }
}
</style>
