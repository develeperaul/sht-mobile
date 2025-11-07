<template>
  <div class="tw-grid">
    <div
      class="tw-rounded-32 tw-p-[2px] tw-inline-flex tw-whitespace-nowrap tw-overflow-auto"
      :class="theme ? theme : 'tw-bg-white'"
    >
      <tab-item
        :theme="theme"
        class="tw-w-full tw-px-2"
        v-for="item in options"
        @click="() => $emit('update:modelValue', item.id)"
        :class="{ active: item.id === modelValue }"
      >
        {{ item.name }}
      </tab-item>
    </div>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: 'tab-head',
})
</script>
<script setup lang="ts">
interface Option {
  id: string | number
  name: string
}
const props = defineProps<{
  modelValue: string | number
  options: Option[]
  theme?: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', val: string | number): void
}>()
</script>
<style lang="scss" scoped></style>
