<template>
  <section class="card-primary home-card">
    <h2 class="home-card__title">
      Скоро в&nbsp;приложении
    </h2>
    <p class="home-card__subtitle">
      Расширяем горизонты и&nbsp;готовим для&nbsp;вас новое
    </p>
    <Swiper
      class="swiper-gallery-pag"
      :initialSlide="1"
      :slidesPerView="1.4"
      centeredSlides
      :spaceBetween="8"
      :modules="modules"
      pagination
    >
      <SwiperSlide
        v-for="i in 4"
      >
        <div class="item gradient-card">
          <div class="img-wrap">
            <img width="200" height="200" src="./images/arrow.png" />
          </div>
          <p class="title">Новые<br>направления</p>
          <p class="text">
            Мы не запускаем направления «для галочки». Каждый новый маршрут — это месяцы подготовки. В разработке Антарктика, Франция, Испания, Саудовская Аравия и кое‑что под грифом «секретно». Вы узнаете об этом первыми.
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination } from 'swiper/modules';

  const modules = [ Pagination ];
</script>

<style scoped lang="scss">
  .item {
    overflow: hidden;
    border-radius: 32px;
    padding: 12px;
    padding-bottom: 32px;
  }

  .img-wrap {
    position: relative;
    z-index: 1;
    width: 100px;
    margin:  0 auto;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      position: absolute;
      border-radius: 100%;
      background-image: linear-gradient(144deg, #a7befd 0%, #72a5f6 95.67%);
      filter: blur(45px);
    }
  }

  .title {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-top: 16px;
    @apply tw-text-gray_main;
  }

  .text {
    text-align: center;
    margin-top: 8px;
    font-size: 14px;
    line-height: 1.15;
    @apply tw-text-gray_icon2;
  }
</style>
