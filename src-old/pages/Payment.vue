<template>
  <q-page class="tw-container">
    <head-block title="Оплата" class="tw-mb-3" />
    <div
      class="tw-rounded-32 tw-grid tw-gap-[35px] tw-overflow-hidden tw-relative tw-text-white tw-p-5"
    >
      <img
        src="~assets/test.png"
        alt=""
        class="tw-absolute tw-w-full tw-h-full tw-object-cover"
      />
      <div class="h2 tw-relative">Камчатка</div>
      <div class="h1 tw-relative">10–17 июня (8 дней)</div>
    </div>
    <div class="tw-bg-white tw-rounded-32 tw-p-5">
      <div>
        <div class="h3 tw-mb-4">Гости</div>
        <div
          class="p1 tw-px-3 tw-py-[8.5px] tw-bg-blue_light tw-mb-3 tw-rounded-[60px] tw-w-fit"
        >
          Гость №1
        </div>
        <div class="p1 tw-mb-2">Богданов Евгений Александрович</div>
        <div class="p1">01.05.1985</div>
      </div>
      <div class="tw-border-b tw-border-blue_bg tw-py-6"></div>
      <div>
        <div class="h3 tw-mb-4">Гости</div>
        <div
          class="p1 tw-px-3 tw-py-[8.5px] tw-bg-blue_light tw-mb-3 tw-rounded-[60px] tw-w-fit"
        >
          Гость №1
        </div>
        <div class="p1 tw-mb-2">Богданов Евгений Александрович</div>
        <div class="p1">01.05.1985</div>
      </div>
    </div>

    <div class="tw-bg-white tw-rounded-32 tw-px-5 tw-py-[50px]">
      <div class="tw-mb-[52px]">
        <div class="h3 tw-mb-4">Общая стоимость</div>
        <div class="tw-grid tw-gap-4 p1">
          <div class="tw-flex tw-justify-between tw-items-center">
            <div>Гость №1</div>
            <div>244 900 ₽</div>
          </div>
          <div class="tw-flex tw-justify-between tw-items-center">
            <div>Гость №1</div>
            <div>244 900 ₽</div>
          </div>
          <div class="tw-flex tw-justify-between tw-items-center">
            <div>Итого</div>
            <div>244 900 ₽</div>
          </div>
        </div>
      </div>
      <div
        class="tw-flex tw-items-center tw-justify-between tw-bg-blue_light tw-rounded-[60px] tw-border-[3px] tw-border-blue_light tw-pl-4 tw-mb-[46px]"
      >
        <div class="p2">1000START</div>
        <base-button class="!tw-w-fit"> Применить </base-button>
      </div>
      <div class="h3 tw-flex tw-justify-between tw-items-center">
        <div>Предоплата</div>
        <div>140 000 ₽</div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
