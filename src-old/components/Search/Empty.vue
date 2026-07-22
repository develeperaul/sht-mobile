<template>
  <div class="empty">
    <p class="text">
      Попробуйте изменить фильтры или&nbsp;посмотрите нашу&nbsp;подборку похожих направлений
    </p>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
  .empty {
    padding: 80px 0;
    text-align: center;
  }

  .text {
    max-width: 320px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 1.2;
    @apply tw-text-gray_main;
  }
</style>
