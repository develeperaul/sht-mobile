<template>
  <div class="field">
    <label class="tw-font-medium" v-if="label && !hideLabel">
      {{ label }}
    </label>
    <div class="input__wrapper" :class="{ error: errorMessage }">
      <input
        v-maska="maska"
        :value="value"
        @input="onInput"
        @blur="handleBlur($event, true)"
        @maska="onMaska"
        :type="type"
        class="input"
        :placeholder="placeholder ?? ''"
        :disabled="disabled"
        :min="min"
        :max="max"
      />
    </div>
    <div v-if="errorMessage" class="p2 tw-text-red tw-mt-2">
      {{ errorMessage }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { useField } from 'vee-validate'

interface MaskaDetail {
  masked: string
  unmasked: string
  completed: boolean
}
const props = withDefaults(
  defineProps<{
    modelValue: string
    type?: string
    maska?: string
    name: string
    rules?: string
    label?: string
    placeholder?: string
    disabled?: boolean
    unMask?: boolean
    hideLabel?: boolean
    min?: string
    max?: string
  }>(),
  {
    type: 'text',
    disabled: false,
    unMask: false,
    hideLabel: false,
  }
)
const unMusked = ref('')
const onMaska = (event: CustomEvent<MaskaDetail>) => {
  unMusked.value = event.detail.unmasked
}

const emitsInput = defineEmits<{
  (e: 'update:modelValue', val: string | number): void
}>()
const { name, rules } = toRefs(props)
const { errorMessage, value, meta, handleBlur } = useField(name, rules, {
  validateOnValueUpdate: false,
  syncVModel: true,
  label: props.label,
})

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  value.value = props.maska && props.unMask ? unMusked.value : target.value
}
function updateInput() {
  if (props.unMask) {
    emitsInput('update:modelValue', unMusked.value)
  } else {
    emitsInput('update:modelValue', value.value)
  }
}
// watchEffect(() => {
//   console.log(props.unMask)

//   if (props.unMask) {
//     emitsInput('update:modelValue', unMusked.value)
//   } else {
//     emitsInput('update:modelValue', value.value)
//   }
// })
// watch(value, (val) => {
//   if (props.unMask) emitsInput('update:modelValue', unMusked.value)
//   else emitsInput('update:modelValue', val)
// })
</script>
<style lang="scss" scoped>
.field {
  @apply tw-grid;
  label {
    @apply tw-mb-2;
  }
  input {
    @apply tw-bg-white p1 tw-px-5 tw-w-full tw-outline-none tw-font-medium;
    height: 50px;
    border-radius: 60px;
    background: #f5f9ff;
  }
  input::placeholder {
    @apply tw-text-gray_icon;
  }
  .input__wrapper {
    @apply tw-relative tw-overflow-hidden;
    border-radius: 60px;
    &.error input {
      @apply tw-border-red tw-border;
    }
  }
}
</style>
