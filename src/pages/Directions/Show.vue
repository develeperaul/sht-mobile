<template>
  <q-page class="tw-relative tw-pb-36">
    <MainCover
      class="dir-sec"
      v-if="direction"
      :id="id"
      :title="direction.name"
      :subtitle="direction.title"
      :image="direction.background"
    />
    <div class="tw-container" v-if="direction">
      <AboutPirmary
        class="dir-sec"
        :maxMembers="direction.max_members"
        :comfortLevel="direction.comfort_level"
        :difficultyLevel="direction.difficulty_level"
        :dates="dates"
        :offer="currentOffer"
      />
      <QuickOrder
        class="dir-sec"
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
    <q-page-sticky expand position="bottom" :offset="[12,8]">
      <TotalPrice v-if="currentOffer" :offer="currentOffer" />
    </q-page-sticky>
    <q-inner-loading :showing="loading" />
  </q-page>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
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

  const { data, loading } = useRequest(
    () => directionsApi.show(props.id),
    {
      watch: [ () => props.id ],
      onSuccess(res) {
        const datesList = Object.values(res.data.dates);
        currentDate.value = null;
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

  watch(() => props.id, () => currentDate.value = null);
  // watch(currentDate, () => currentOffer.value = null);
</script>

<style scoped lang="scss">
  .dir-sec {
    margin-bottom: 8px;
  }
</style>
