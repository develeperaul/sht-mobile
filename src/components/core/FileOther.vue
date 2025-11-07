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
    <div class="file-img__url">
      {{ url }}
    </div>
    <!-- <img v-if="url" :src="url" alt="" /> -->
  </div>
  <div v-else class="">
    <BaseIcon
      name="image2"
      class="tw-w-[120px] tw-h-[120px]"
      @click="addFile"
    />
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
  @apply tw-w-[120px] tw-h-[120px]  tw-relative tw-bg-blue_bg tw-rounded-[30px] tw-grid tw-place-content-center;
  & img {
    @apply tw-rounded-[30px];
  }
  &__btn {
    @apply tw-absolute -tw-right-2 -tw-top-2;
  }
  &__url {
    @apply p1;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-height: 50px;
    width: 80px;
    text-overflow: ellipsis;
  }
}
</style>
