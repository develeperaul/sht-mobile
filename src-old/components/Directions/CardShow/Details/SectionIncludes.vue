<template>
  <section>
    <DropdownItem
      v-if="transport"
      titleTag="h2"
      title="✓ Транспорт (Трансфер)"
      :text="transport.description"
      :initialActive="true"
    />
    <DropdownItem
      v-if="location"
      titleTag="h2"
      title="✓ Все локации, экскурсиии прочий сервис"
      :text="location.name"
      :initialActive="true"
    />
    <DropdownItem
      v-if="extra"
      class="dr-item-extra"
      titleTag="h2"
      title="x Дополнительно оплачивается"
      :text="extra.name"
    />
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { AdditionalInfo, Service } from 'src/api/directions';
  import DropdownItem from '../DropdownItem.vue';

  const props = defineProps<{
    services: Service[],
    location: AdditionalInfo | null,
    extra: AdditionalInfo | null,
  }>();

  const transport = computed(() => {
    const res = props.services.find(item => item.type === 'transport');
    return res ?? null;
  });
</script>

<style scoped lang="scss">
  .dr-item-extra :deep(.label) {
    @apply tw-text-gray_icon2;
  }
</style>
