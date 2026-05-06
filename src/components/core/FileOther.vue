<template>
  <div v-if="id" class="add glass-w">
    <div class="add__btn" @click="emit('deleteFile', id)">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.1219 9.51222C17.1219 13.715 13.7149 17.122 9.5121 17.122C5.30935 17.122 1.90234 13.715 1.90234 9.51222C1.90234 5.30947 5.30935 1.90247 9.5121 1.90247C13.7149 1.90247 17.1219 5.30947 17.1219 9.51222Z" fill="#071E3A" stroke="#071E3A" stroke-width="1.90244" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.2032 6.82166L9.51272 9.51211M9.51272 9.51211L6.82227 12.2026M9.51272 9.51211L12.2032 12.2026M9.51272 9.51211L6.82227 6.82166" stroke="white" stroke-width="1.14146" stroke-linecap="round"/>
      </svg>

    </div>

    <div v-if="noimg" class="add__url">
      <!-- {{ url }} -->
      <img src="~assets/img/pdf.png" alt="" />
    </div>
    <template v-else>
      <img class="add__img" v-if="url" :src="url" alt="" />
    </template>
  </div>

  <div v-else>
    <div class="add glass-w" @click="openCamera">
      <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_9880_6040)">
      <rect x="22.8301" y="22.8292" width="38.0488" height="38.0488" rx="19.0244" fill="white" fill-opacity="0.4" shape-rendering="crispEdges"/>
      <path d="M41.8538 37.0975L41.8538 46.6097M46.6099 41.8536L37.0977 41.8536" stroke="#071E3A" stroke-width="1.42683" stroke-linecap="round"/>
      </g>
      <defs>
      <filter id="filter0_d_9880_6040" x="0.000812531" y="-4.19617e-05" width="83.7074" height="83.7074" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="11.4146"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9880_6040"/>
      <feBlend mode="normal" in="BackgroundImageFix" in2="effect1_dropShadow_9880_6040" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      </filter>
      </defs>
      </svg>

    </div>
    <!-- <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="tw-w-[120px] tw-h-[120px]"
      @click="openCamera"
    >
      <rect width="120" height="119.008" rx="30" fill="#E5EEF9" />
      <g clip-path="url(#clip0_717_8169)">
        <g clip-path="url(#clip1_717_8169)">
          <path
            d="M81.5481 59.9355C81.5481 71.872 71.8716 81.5484 59.9352 81.5484C47.9987 81.5484 38.3223 71.872 38.3223 59.9355C38.3223 47.999 47.9987 38.3226 59.9352 38.3226C71.8716 38.3226 81.5481 47.999 81.5481 59.9355Z"
            fill="#C6D9F1"
          />
          <path
            d="M46.9668 59.9355H71.419"
            stroke="white"
            stroke-width="3.24194"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M59.1934 46.9678V71.42"
            stroke="white"
            stroke-width="3.24194"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_717_8169">
          <rect
            width="51.871"
            height="51.871"
            fill="white"
            transform="translate(34 34)"
          />
        </clipPath>
        <clipPath id="clip1_717_8169">
          <rect
            width="51.871"
            height="51.871"
            fill="white"
            transform="translate(34 34)"
          />
        </clipPath>
      </defs>
    </svg> -->
  </div>
</template>

<script setup lang="ts">
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

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
      quality: 85,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt, // системное меню: Камера / Фото
    })

    if (!photo.dataUrl) return

    // dataUrl → Blob → File, чтобы наверх улетал File
    const res = await fetch(photo.dataUrl)
    const blob = await res.blob()
    const ext = blob.type.split('/')[1] || 'jpg'

    const file = new File([blob], `photo.${ext}`, {
      type: blob.type,
    })

    emit('fileLoad', file)
  } catch (e) {
    console.log('Camera cancelled or error', e)
  }
}
</script>

<style lang="scss" scoped>
.add {

  &__img {
    @apply   tw-absolute tw-top-0 tw-left-0 tw-object-cover;
    border-radius: 15px;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
  &__btn {
    @apply tw-absolute tw-right-0 tw-top-0 tw-m-2;
    z-index: 1;
  }
  &__url {
    @apply p1;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-height: 50px;
    text-overflow: ellipsis;

    & img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: auto;
      width: 40px;
      object-fit: contain;
    }
  }
}
.add {
  width: 78px;
  height: 78px;
  box-shadow: 0px 0px 22.83px 0px #0000000D;
  background: var(--SystemBlue-Background_Field, #98B7DE1A);
  border-radius: 19px;
  display: grid;
  place-content: center;
}
</style>
