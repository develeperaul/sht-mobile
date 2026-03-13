<template>
  <section class="card-primary home-card tw-relative">
    <h2 class="home-card__title">
      SayHello Journal
    </h2>
    <p class="home-card__subtitle">
      Эстетика, гастрономия и культура путешествий
    </p>
    <CategoriesList
      class="categories-list"
      :activeCategory="activeCategory"
      @change:category="activeCategory = $event"
    />
    <SliderItems class="items-slider" :items="itemsLimited" />
    <CardLinkNext :to="{ name: 'posts.index' }" text="Все статьи" />
    <q-inner-loading class="tw-z-10" :showing="loading" />
  </section>
</template>

<script setup lang="ts">
  import CardLinkNext from 'src/components/Home/CardLinkNext.vue';
  import SliderItems from './SliderItems.vue';
  import CategoriesList from './Categories.vue';
  import useRequest from 'src/composables/useRequest';
  import * as postsApi from 'src/api/posts';
  import type { PostCategory } from 'src/api/posts';

  const activeCategory = ref<PostCategory | null>(null);

  const { data, loading } = useRequest(
    () => {
      return postsApi.all({
        ...(activeCategory.value ? { rubric_ids: [ activeCategory.value.id ] } : {}),
      });
    },
    { watch: [ activeCategory ] }
  );

  const itemsLimited = computed(() => {
    return (data.value?.data ?? []).slice(0, 7);
  });
</script>

<style scoped lang="scss">
  .items-slider {
    margin-bottom: 12px;
  }

  .categories-list {
    margin-bottom: 4px;
  }
</style>
