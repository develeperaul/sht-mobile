<template>
  <div class="glass empty">
    <p class="title">Ваш вишлист пока пуст</p>
    <p class="text">Отмечайте сердечком путешествия, которые вас вдохновили, чтобы не потерять их.</p>
    <BaseButton class="!tw-w-fit tw-mx-auto" @click="$router.push({ name: 'directions.index' })">
      К направлениям
    </BaseButton>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
  .empty {
    --bg-color: rgba(255, 255, 255, 0.5);
    padding: 24px 20px;
    text-align: center;
  }

  .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
    @apply tw-text-gray_main;
  }

  .text {
    max-width: 300px;
    margin: 0 auto;
    margin-bottom: 16px;
  }
</style>
