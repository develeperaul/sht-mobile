<template>
  <section class="card-primary sec-card">
    <NavMenu class="nav-menu" :active="activeTab" @change:tab="activeTab = $event" />
    <div class="area">
      <SectionDescription
        v-if="activeTab === 'description'"
        :text="direction.description || '-'"
      />
      <SectionHotels v-else-if="activeTab === 'hotels'" :hotels="direction.hotels" />
      <SectionFaq v-else-if="activeTab === 'faq'" :questions="direction.questions" />
      <SectionFood v-else-if="activeTab === 'food'" :text="foodText" />
      <SectionIncludes
        v-else-if="activeTab === 'includes'"
        :services="direction.services"
        :location="direction.location"
        :extra="direction.additional_info"
      />
      <SectionRoutes v-else-if="activeTab === 'routes'" :routes="direction.roads" />
    </div>
  </section>
</template>

<script setup lang="ts">
  import NavMenu from './NavMenu.vue';
  import SectionDescription from './SectionDescription.vue';
  import SectionHotels from './SectionHotels.vue';
  import SectionFood from './SectionFood.vue';
  import SectionFaq from './SectionFaq.vue';
  import SectionIncludes from './SectionIncludes.vue';
  import SectionRoutes from './SectionRoutes.vue';
  import { ref } from 'vue';
  import type { DirectionItem } from 'src/api/directions';

  const props = defineProps<{
    direction: DirectionItem,
  }>();

  const activeTab = ref('description');

  const foodText = computed(() => {
    const res = props.direction.services.find(item => item.type === 'power_supply');
    if(!res) return '-';
    return res.description;
  });
</script>

<style scoped lang="scss">
  .nav-menu {
    margin-bottom: 32px;
  }

  .sec-card {
    padding-right: 8px;
  }

  .area {
    height: 450px;
    overflow-x: hidden;
    padding-right: 12px;

    &::-webkit-scrollbar {
      display: block !important;
      width: 2px;
    }

    &::-webkit-scrollbar-track {
      display: block !important;
      border-radius: 2px;
      @apply tw-bg-blue_light_icon;
    }

    &::-webkit-scrollbar-thumb {
      display: block !important;
      border-radius: 2px;
      @apply tw-bg-blue_icon2;
    }
  }
</style>
