<template>
  <component class="item" :class="[ `item-${size}` ]" :is="tag">
    <div class="content">
      <div class="col1">
        <div class="badge badge-lg glass">
          от <span v-amount-pretty="item.offers_min_price"></span>
        </div>
        <FavButton v-if="!hideFavourites" :size="size === 'lg' ? '34px' : '31px'" :itemId="item.id" />
      </div>
      <div class="col2">
        <p class="name">{{ item.name }}</p>
        <p class="subtitle" v-if="!hideSubtitle && item.title">
          {{ item.title }}
        </p>
        <div class="badges">
          <div class="badge badge-sm glass">от {{ item.min_date }} дней</div>
          <div class="badge badge-sm glass">{{ period }}</div>
        </div>
      </div>
    </div>
    <div class="cover-wrap" v-if="item.background">
      <img class="cover-img" :src="item.background.url" loading="lazy" />
    </div>
  </component>
</template>

<script setup lang="ts">
  import type { DirectionListItem } from 'src/api/directions';
  import { monthLabels } from 'src/components/Directions/model/consts';
  import { computed } from 'vue';
  import FavButton from 'src/components/Favourites/ButtonToggle.vue';

  type Item = Pick<
    DirectionListItem,
    'id' | 'background' | 'offers_min_start_date' |
    'offers_max_end_date' | 'name' | 'title' |
    'min_date' | 'offers_min_price'
  >;

  const props = withDefaults(
    defineProps<{
      tag?: string,
      item: Item,
      size?: 'sm' | 'lg',
      hideSubtitle?: boolean,
      hideFavourites?: boolean,
    }>(),
    { size: 'lg', hideSubtitle: false, hideFavourites: false, tag: 'a' },
  );

  const period = computed(() => {
    const i1 = parseInt(props.item.offers_min_start_date);
    const i2 = parseInt(props.item.offers_max_end_date);
    const from = (!isNaN(i1) && monthLabels[i1-1]?.[0]) || '?';
    const to = (!isNaN(i2) && monthLabels[i2-1]?.[0]) || '?';
    return `${from}-${to}`;
  });
</script>

<style scoped lang="scss">
  .item {
    display: block;
    position: relative;
    z-index: 1;
    min-height: var(--min-h, 190px);
  }

  .item-sm {
    .item, .cover-img {
      border-radius: 24px;
    }

    .content {
      padding: 8px;
    }

    .name {
      font-weight: 600;
      font-size: 20px;
    }
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
    white-space: nowrap;
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
