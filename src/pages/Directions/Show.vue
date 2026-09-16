<template>
  <q-page class="tw-relative">
    <MainCover
      class="dir-sec"
      v-if="direction"
      :id="id"
      :title="direction.name"
      :subtitle="direction.title"
      :image="direction.background"
    />
    <div class="tw-container " :class="{ 'tw-pb-28': currentOffer }" v-if="direction">


      <AboutPirmary
        class="dir-sec"
        :maxMembers="direction.max_members"
        :comfortLevel="direction.comfort_level"
        :difficultyLevel="direction.difficulty_level"
        :dates="dates"
        :offer="currentOffer"
      />
      <QuickOrder
        class="dir-sec "
        v-if="currentDate"
        :directionId="id"
        :currentDate="currentDate"
        :currentOffer="currentOffer"
        :dates="dates"
        @change:date="currentDate = $event"
        @change:offer="currentOffer = $event"
      />
      <CardDetails :direction="direction" />
    </div>
    <q-inner-loading :showing="loading" />
    <q-page-sticky class="price-sticky" expand position="bottom" :offset="[12,8]">
      <TotalPrice v-if="currentOffer" :offer="currentOffer" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import * as directionsApi from 'src/api/directions';
  import useRequest from 'src/composables/useRequest';
  import AboutPirmary from 'src/components/Directions/CardShow/AboutPrimary/index.vue';
  import MainCover from 'src/components/Directions/CardShow/MainCover.vue';
  import CardDetails from 'src/components/Directions/CardShow/Details/index.vue';
  import QuickOrder from 'src/components/Directions/CardShow/QuickOrder/index.vue';
  import TotalPrice from 'src/components/Directions/CardShow/TotalPrice.vue';

  import type { ShowOfferItem } from 'src/api/directions';

  const props = defineProps<{
    id: string,
  }>();

  const route = useRoute();

  const { data, loading, send } = useRequest(
    () => directionsApi.show(props.id),
    {
      cacheKey: () => `directions:show:${props.id}`,
      cacheTtl: 10 * 60 * 1000,
      staleWhileRevalidate: true,
      onSuccess(res) {
        const datesList = Object.values(res.data.dates);
        if(datesList[0]) {
          currentDate.value = datesList[0][0] ?? null;
        }
      },
    }
  );

  const direction = computed(() => data.value?.data ?? null);
  const dates = computed(() => {
    if(!direction.value) return [];
    return Object.values(direction.value.dates)[0] ?? [];
  });

  const currentDate = ref<string | null>(null);
  const currentOffer = ref<ShowOfferItem | null>(null);

  watch(() => route.params.id, () => {
    currentOffer.value = null;
    currentDate.value = null;
    send();
  });
</script>

<style scoped lang="scss">
  .dir-sec {
    margin-bottom: 8px;
  }

  .price-sticky {
    z-index: 1000;
  }
</style>
