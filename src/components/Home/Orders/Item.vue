<template>
  <component class="item item-lg" :is="tag">
    <div class="content">
      <div class="col1">
        <div class="badge badge-lg glass">
          <span v-amount-pretty="item.final_price"></span>
        </div>
      </div>
      <div class="col2">
        <p class="name">{{ item.offer.direction.name }}</p>
        <p class="subtitle" v-if="item.offer.direction.title">
          {{ item.offer.direction.title }}
        </p>
        <div class="badges">
          <div class="badge badge-sm glass">{{ start }}</div>
        </div>
      </div>
    </div>
    <div class="cover-wrap" v-if="item.offer.direction.background">
      <img class="cover-img" :src="item.offer.direction.background.url" loading="lazy" />
    </div>
  </component>
</template>

<script setup lang="ts">
  import type { OrderListItem } from 'src/api/orders';
  import { prettyDate } from 'src/utils/dates';
  import { computed } from 'vue';

  const props = withDefaults(
    defineProps<{
      tag?: string,
      item: OrderListItem,
    }>(),
    { tag: 'a' },
  );

  const start = computed(() => prettyDate(props.item.offer.start_date));
</script>

<style scoped lang="scss">
  .item {
    display: block;
    position: relative;
    z-index: 1;
    min-height: var(--min-h, 190px);
  }

  .item-lg {
    .item, .cover-img {
      border-radius: 32px;
    }

    .content {
      padding: 20px;
    }

    .name {
      font-weight: 700;
      font-size: 24px;
    }
  }

  .col1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .name {
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .content, .cover-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
    @apply tw-text-white;
  }

  .cover-wrap {
    z-index: -1;
  }

  .cover-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .badges {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .badge {
    --radius: 20px;
    display: inline-block;
    padding: 6px 12px;
    line-height: 1;
    @apply tw-text-white;

    &-sm {
      padding: 4px 8px;
    }

    &-lg {
      padding: 8px 12px;
    }

    &-sm, &-lg {
      font-size: 12px;
      line-height: 1.5;
      letter-spacing: -0.02em;
      font-weight: 400;
    }
  }
</style>
