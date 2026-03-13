<template>
  <q-page class="main-page env-t">
    <HelloScreen />
    <div class="tw-container main-content">
      <SearchDirections class="search-dirs" />
      <Stories v-if="storyList.data" :stories="storyList.data" />
      <DirectionsList />
      <EventsList class="main-page__section" />
      <PostsList class="main-page__section" />
      <!-- <ReviewsList class="main-page__section" /> -->
      <SoonSection class="main-page__section" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import DirectionsList from 'src/components/Home/DirectionsList/index.vue';
  import EventsList from 'src/components/Home/Events/index.vue';
  import SearchDirections from 'src/components/Home/SearchDirections.vue';
  import PostsList from 'src/components/Posts/PostsList/index.vue';
  import SoonSection from 'src/components/Home/Soon/index.vue';
  import Stories from 'src/components/Stories/Index.vue';
  import HelloScreen from 'src/components/Home/Hello/index.vue';
  import ReviewsList from 'src/components/Home/ReviewsList/index.vue';

  const storeMain = mainStore();
  const { storyList } = storeToRefs(storeMain);
</script>

<style scoped lang="scss">
  .main-page {
    position: relative;
    z-index: 1;

    &__section {
      margin-top: 8px;
    }
  }

  .main-content {
    margin-top: 25px;
  }

  .search-dirs {
    margin-bottom: 8px;
  }
</style>
