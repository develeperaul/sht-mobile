<template>
  <div class="cover">
    <img class="img" :src="image.url" :alt="title" />
    <div class="content">
      <div class="top">
        <ButtonRound
          class="btn-back"
          type="button"
          icon="arrowleft"
          size="38px"
          iconSize="0.6em"
          @click="$router.back"
        />
      </div>
      <div class="bottom">
        <h1 class="title">{{ title }}</h1>
        <p class="subtitle">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ButtonRound from 'src/components/Base/ButtonRound.vue';

  const props = defineProps<{
    id: string,
    image: { url: string },
    title: string,
    subtitle: string,
  }>();
</script>

<style scoped lang="scss">
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .cover {
    width: 100%;
    height: 300px;
    position: relative;
    z-index: 1;
    border-radius: 0 0 32px 32px;
    overflow: hidden;
    @apply tw-text-white;
  }

  .img {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-size: cover;
    left: 0;
    top: 0;
  }

  .title {
    font-size: 30px;
    line-height: 1.1;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 24px;
    padding-bottom: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
  }

  .subtitle {
    font-size: 16px;
    line-height: 1.375;
    margin-top: 8px;
  }

  .btn-back {
    @apply tw-text-white;
  }
</style>
