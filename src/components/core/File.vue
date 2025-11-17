<template>
  <div v-if="id" class="file-img">
    <div class="file-img__btn" @click="emit('deleteFile', id)">
      <svg
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M29.4519 16.0645C29.4519 23.458 23.4583 29.4516 16.0648 29.4516C8.67134 29.4516 2.67773 23.458 2.67773 16.0645C2.67773 8.67104 8.67134 2.67743 16.0648 2.67743C23.4583 2.67743 29.4519 8.67104 29.4519 16.0645Z"
          fill="#FF3B30"
        />
        <path
          d="M7.9668 16H23.1126"
          stroke="white"
          stroke-width="2.00806"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <img v-if="url" :src="url" alt="" />
  </div>
  <div v-else class="">
    <svg
      @click="addFile"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="120" height="119.008" rx="30" fill="white" />
      <g clip-path="url(#clip0_321_8590)">
        <g clip-path="url(#clip1_321_8590)">
          <path
            d="M81.5481 59.9355C81.5481 71.872 71.8716 81.5484 59.9352 81.5484C47.9987 81.5484 38.3223 71.872 38.3223 59.9355C38.3223 47.999 47.9987 38.3226 59.9352 38.3226C71.8716 38.3226 81.5481 47.999 81.5481 59.9355Z"
            fill="#C6D9F1"
          />
          <path
            d="M46.9678 59.9355H71.42"
            stroke="white"
            stroke-width="3.24194"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M59.1924 46.9677V71.42"
            stroke="white"
            stroke-width="3.24194"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_321_8590">
          <rect
            width="51.871"
            height="51.871"
            fill="white"
            transform="translate(34 34)"
          />
        </clipPath>
        <clipPath id="clip1_321_8590">
          <rect
            width="51.871"
            height="51.871"
            fill="white"
            transform="translate(34 34)"
          />
        </clipPath>
      </defs>
    </svg>

    <Field name="file" type="file">
      <input ref="fileInput" type="file" hidden @change="loadFile" />
    </Field>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  id?: string
  url?: string
}>()
const fileInput = ref<HTMLInputElement | null>(null)
const emit = defineEmits<{
  (e: 'fileLoad', file: File): void
  (e: 'deleteFile', id: string): void
}>()
const addFile = () => {
  console.log(fileInput.value)
  // fileInput.value?.addEventListener('click', function (e) {
  //   console.log(e.type)
  // })
  if (fileInput.value) fileInput.value.click()
}

const loadFile = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  if (inputElement.files) {
    if (inputElement.files[0]) emit('fileLoad', inputElement.files[0])
  }
}
</script>
<style lang="scss" scoped>
.file-img {
  @apply tw-w-[120px] tw-h-[120px]  tw-relative;
  & img {
    @apply tw-rounded-[30px] tw-object-cover tw-w-[120px] tw-h-[120px];
  }
  &__btn {
    @apply tw-absolute -tw-right-2 -tw-top-2;
  }
}
</style>
