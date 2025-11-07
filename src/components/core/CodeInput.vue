<template>
  <div class="input-code-block tw-flex tw-gap-4">
    <input
      v-for="(input, index) in inputsLenght"
      :key="index"
      ref="inputEl"
      class="input-code"
      required="true"
      type="tel"
      inputmode="numeric"
      placeholder="1"
      @input="onInput"
      @focus="inputFocus"
      @keydown.delete="test($event, index)"
    />

    <input v-model="codeValue" type="number" hidden name="code" />
  </div>
</template>
<script setup lang="ts">
import { useField } from 'vee-validate'
import { defineProps, onMounted, ref, toRefs, watch } from 'vue'
const KEYCODES = {
  backspace: 8,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
}
const props = withDefaults(
  defineProps<{
    inputsLenght?: string | number
  }>(),
  {
    inputsLenght: 4,
  }
)
const { inputsLenght } = toRefs(props)
const emit = defineEmits<{
  (e: 'filled'): void
  (e: 'unfilled'): void
}>()
const inputEl = ref<HTMLInputElement[]>([])
const arrValue = ref(Array(4))
const onInput = (e) => {
  console.log('onInput')

  let value = e.target.value.replace(/[^\d]/gi, '').substring(0, 1)
  e.target.value = value
  inputEl.value.forEach((inp, index) => {
    codeValue.value = value
    if (value && inp === e.target && inputEl.value.length > index + 1) {
      const nextEl = inputEl.value[index + 1]
      console.log(value)
      if (inputEl.value[index + 1].value === '') nextEl.focus()
    }
    if (inp === e.target && inputEl.value.length - 1 >= index) {
      arrValue.value.splice(index, 1, value)
    }
  })
}
const test = (e, index) => {
  if (e.target.value.length > 0) {
    e.target.value = ''
  } else if (inputEl.value[index - 1]) {
    const prevInput = inputEl.value[index - 1]
    e.target.value = ''
    prevInput.focus()
    console.log(e.target.value)
  }
}
const inputFocus = (e) => {
  // console.log(e.target);
  if (e.target.value) {
    e.target.value = ''
    onInput(e)
  }
}

onMounted(() => {})
watch(arrValue.value, (val, old) => {
  const arrToString = arrValue.value.join('')
  if (arrToString.length === props.inputsLenght) {
    codeValue.value = arrToString
    emit('filled')
  } else {
    emit('unfilled')
  }
})

const {
  errorMessage,
  value: codeValue,
  meta,
} = useField('kod', `required|min:${inputsLenght.value}`, {
  validateOnValueUpdate: false,
})
</script>
<style lang="scss" scoped>
.input-code {
  /*tw-border-negative tw-border*/
  @apply h1 tw-outline-none  tw-border-b tw-border-blue_bg tw-bg-white tw-text-center tw-w-full tw-h-[60px] focus:tw-border-red;
  @apply focus:tw-border-blue_link focus:tw-border-red valid:tw-border-red;
}
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  display: none;
}
input:not(:placeholder-shown) {
  /*tw-border-blue*/
  @apply tw-outline-none;
}
input::placeholder {
  opacity: 0;
}
</style>
