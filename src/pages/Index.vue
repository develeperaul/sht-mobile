<template>
  <q-page class="main-page env-t">
    <HelloScreen :type="dayTimeType" />
    <div class="tw-container main-content">
      <SearchDirections class="search-dirs" :color="dayTimeType === 'night' ? 'white' : 'blue'" />
      <Stories class="main-stories" v-if="storyList.data" :stories="storyList.data" />
      <HomeOrders />
      <DirectionsList class="main-page__section" />
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
  import HomeOrders from 'src/components/Home/Orders/index.vue';
  import ReviewsList from 'src/components/Home/ReviewsList/index.vue';
  import { computed } from 'vue';

  const storeMain = mainStore();
  const { storyList } = storeToRefs(storeMain);

  const date = new Date();

  const dayTimeType = computed<'morning' | 'evening' | 'night'>(() => {
    const hours = date.getHours();
    if(hours >= 7 && hours <= 16) return 'morning';
    else if(hours > 16 && hours <= 22) return 'evening';
    else return 'night';
  });
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
    margin-bottom: 12px;
  }

  .main-stories {
    margin-bottom: 12px;
  }
</style>
