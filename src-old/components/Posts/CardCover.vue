<template>
  <div class="card-cover">
    <img class="img-cover" :src="image.url" :alt="title" />
    <div class="content env-t">
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
        <div class="badges">
          <div class="badge glass">
            <span class="badge__icon">
              <BaseIcon name="calendar" fit />
            </span>
            <span class="badge__text">{{ dateVal }}</span>
          </div>
          <div class="badge glass">
            <span class="badge__icon">
              <BaseIcon name="clock" fit />
            </span>
            <span class="badge__text">{{ readTime }} мин</span>
          </div>
        </div>
        <h1 class="title">{{ title }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { PostsImage } from 'src/api/posts';
  import { computed } from 'vue';
  import ButtonRound from 'src/components/Base/ButtonRound.vue';
  import { prettyDate } from 'src/utils/dates';

  const props = defineProps<{
    title: string,
    date: string,
    readTime: number,
    image: PostsImage,
  }>();

  const dateVal = computed(() => prettyDate(props.date));
</script>

<style scoped lang="scss">
  .card-cover {
    position: relative;
  }

  .img-cover {
    width: 100%;
    border-radius: 0 0 32px 32px;
  }

  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding-right: 12px;
    padding-bottom: 12px;
    padding-left: 18px;
    left: 0;
    top: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    @apply tw-text-white;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;
  }

  .badge {
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
    @apply tw-text-white;

    &__icon {
      width: 20px;
      height: 20px;
      @apply tw-text-blue_icon2;
    }

    &__text {
      font-size: 16px;
      line-height: 1;
    }
  }

  .btn-back {
    @apply tw-text-white;
  }
</style>
