<template>
  <div class="card-review tw-grid tw-gap-6">
    <div>
      <div class="tw-text-center tw-max-w-[265px] h2 tw-mx-auto tw-mb-6">
        Оцените поездку в ЮАР
      </div>
      <div class="tw-flex tw-gap-2 tw-justify-between">
        <Star2 active />
        <Star2 active />
        <Star2 active />
        <Star2 />
        <Star2 />
      </div>
    </div>
    <div class="tw-grid tw-gap-6">
      <div class="tw-grid tw-gap-2">
        <div
          class="tw-p-5 tw-min-h-[117px] tw-w-full p2 tw-bg-blue_bg tw-rounded-32"
        >
          Расскажите немного о поездке — где были, когда, что особенно
          запомнилось и как всё прошло для вас?
        </div>
        <div
          class="tw-p-5 tw-min-h-[117px] tw-w-full p2 tw-bg-blue_bg tw-rounded-32"
        >
          Как вы узнали о TeamTravel и почему решили доверить организацию вашего
          путешествия нам?
        </div>
      </div>
      <div>
        <div class="p1">Прикрепите фото</div>
        <div class="tw-flex tw-overflow-auto tw-gap-1"></div>
      </div>
      <BaseButton> Оставить отзыв</BaseButton>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.card-review {
  @apply tw-bg-white tw-p-5 tw-rounded-32;
}
</style>
