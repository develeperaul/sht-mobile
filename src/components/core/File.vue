<template>
  <div v-if="id" class="file-img">
    <div class="file-img__btn" @click="emit('deleteFile', id)">
      <!-- удаление фото -->
      <svg width="33" height="33" viewBox="0 0 33 33" fill="none">
        <path
          d="M29.4519 16.0645C29.4519 23.458 23.4583 29.4516 16.0648 29.4516C8.67134 29.4516 2.67773 23.458 2.67773 16.0645C2.67773 8.67104 8.67134 2.67743 16.0648 2.67743C23.4583 2.67743 29.4519 8.67104 29.4519 16.0645Z"
          fill="#FF3B30"
        />
        <path
          d="M7.9668 16H23.1126"
          stroke="white"
          stroke-width="2.00806"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <img v-if="url" :src="url" alt="" />
  </div>

  <!-- кнопка добавить фото -->
  <div v-else>
    <svg
      @click="openCamera"
      width="120"
      height="120"
      fill="none"
      viewBox="0 0 120 120"
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
  </div>
</template>

<script setup lang="ts">
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { compressImageFile } from 'src/composition/compressImage' // путь подстрой под проект

const props = withDefaults(
  defineProps<{
    id?: string
    url?: string
    noimg?: boolean
  }>(),
  { noimg: true }
)

const emit = defineEmits<{
  (e: 'fileLoad', file: File): void
  (e: 'deleteFile', id: string): void
}>()

const openCamera = async () => {
  try {
    const photo = await Camera.getPhoto({
      quality: 90, // исходное качество от камеры
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt, // системное меню: Фото / Камера
    })

    if (!photo.dataUrl) return

    // dataUrl -> Blob -> File
    const res = await fetch(photo.dataUrl)
    const blob = await res.blob()
    const ext = blob.type.split('/')[1] || 'jpg'
    const originalFile = new File([blob], `photo.${ext}`, {
      type: blob.type,
    })

    // СЖАТИЕ: можно поменять 1280 и 0.8 на свои значения
    const compressed = await compressImageFile(originalFile, 1280, 1280, 0.8)

    emit('fileLoad', compressed)
  } catch (e) {
    console.log('Camera cancelled or error', e)
  }
}
</script>

<style lang="scss" scoped>
.file-img {
  @apply tw-w-[120px] tw-h-[120px] tw-relative tw-bg-blue_bg tw-rounded-[30px] tw-grid tw-place-content-center;
  img {
    @apply tw-rounded-[30px] tw-w-full tw-h-full tw-absolute tw-top-0 tw-left-0 tw-object-cover;
  }
  &__btn {
    @apply tw-absolute -tw-right-2 -tw-top-2;
    z-index: 1;
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
