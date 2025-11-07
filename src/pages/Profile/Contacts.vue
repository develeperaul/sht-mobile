<template>
  <q-page class="tw-container">
    <head-block title="Контакты" class="tw-mb-3" />
    <div class="tw-mb-8">
      <div
        class="tw-bg-white tw-p-3 tw-rounded-32 tw-h-[226px] tw-grid tw-content-between"
      >
        <div class="h1 tw-font-gilroy tw-font-black">SayHello 👋</div>
        <div>
          <address class="p2 tw-not-italic">г. Уфа, ул. Ленина, 130</address>
          <a class="p2 tw-text-black" href="tel:+79999999999">
            +7 (999) 999-99-99
          </a>
        </div>
      </div>
    </div>
    <div class="">
      <ul
        class="p1 tw-w-fit tw-text-center marker:tw-rounded-full marker:tw-bg-red marker:tw-inline-block"
      >
        <li>Контакты поддержки (email)</li>
        <li>Название юридического лица или индивидуального предпринимателя</li>
        <li>Сайт (ссылка)</li>
      </ul>
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
</script>
<style lang="scss" scoped></style>
