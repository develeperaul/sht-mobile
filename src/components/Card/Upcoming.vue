<template>
  <div @click="router.push(to)" class="card-upcoming">
    <div class="card-upcoming__top tw-pb-3">
      <div class="tw-flex tw-gap-2">
        <img :src="img" alt="" class="card-upcoming__img" />
        <div class="tw-px-3">
          <div class="p1 tw-mb-1 tw-max-w-[206px]">
            {{ title }}
          </div>
          <div
            class="tw-min-h-[68px] h1 tw-uppercase"
            v-fit-text="{ min: 26, max: 30, lineHeight: 1.1 }"
          >
            {{ name }}
          </div>
        </div>
      </div>
      <div class="p1 tw-h-[54px] tw-flex tw-justify-between tw-items-end">
        <div>{{ dates }}</div>
        <div>
          {{ diff }}
          {{
            Number(diff) == 1
              ? 'день'
              : Number(diff) >= 2 && Number(diff) <= 4
                ? 'дня'
                : 'дней'
          }}
        </div>
      </div>
    </div>
    <div
      class="card-upcoming__bottom tw-font-semibold tw-flex tw-justify-between tw-items-center"
    >
      <div class="tw-font-semibold">{{ statusNaming }}</div>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <foreignObject x="-3" y="-3" width="36" height="36"
          ><div
            xmlns="http://www.w3.org/1999/xhtml"
            style="
              backdrop-filter: blur(1.5px);
              clip-path: url(#bgblur_0_695_8141_clip_path);
              height: 100%;
              width: 100%;
            "
          ></div
        ></foreignObject>
        <g data-figma-bg-blur-radius="3">
          <path
            d="M11 8.89221L17 15.3922L11 21.8922"
            stroke="#161616"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="bgblur_0_695_8141_clip_path" transform="translate(3 3)">
            <rect
              y="30"
              width="30"
              height="30"
              rx="15"
              transform="rotate(-90 0 30)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStatus } from 'src/composition/statuslist'
import { useRouter } from 'vue-router'

const props = defineProps<{
  to: { name: string; params: { uuid: string } }
  title: string
  dates: string
  img: string
  name: string
  status:
    | 'fresh'
    | 'pending'
    | 'paid'
    | 'cancelled'
    | 'completed'
    | 'waiting_review'
  diff: string
}>()

const router = useRouter()

const { statusNaming } = useStatus(props.status)
</script>
<style lang="scss" scoped>
.card-upcoming {
  @apply tw-bg-white tw-overflow-hidden tw-grid;
  border-radius: 32px;
  &__top {
    @apply tw-px-5 tw-pt-5;
  }
  &__bottom {
    @apply tw-bg-geen_btn tw-px-5 tw-py-[11px];
  }
  &__img {
    width: 73px;
    height: 73px;
    border-radius: 9999px;
    overflow: hidden;
    flex-shrink: 0;
  }
}
</style>
