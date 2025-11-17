<template>
  <q-page class="tw-container tw-grid tw-content-between">
    <div>
      <head-block title="Документы" class="tw-mb-3" />
      <div class="tw-bg-white tw-rounded-32 tw-px-2.5">
        <router-link
          :to="{ name: 'sogl' }"
          class="tw-flex tw-items-center tw-justify-between tw-h-[55px] p1"
        >
          <div class="tw-flex tw-gap-2 tw-items-center">
            <div>Лицензионное соглашение</div>
          </div>
          <BaseIcon name="right" class="tw-w-5 tw-h-5 tw-text-blue_icon" />
        </router-link>
        <div class="tw-border-b tw-border-blue_bg"></div>
        <router-link
          :to="{ name: 'policy' }"
          class="tw-flex tw-items-center tw-justify-between tw-h-[55px] p1"
        >
          <div class="tw-flex tw-gap-2 tw-items-center">
            <div>Политика конфиденциальности</div>
          </div>
          <BaseIcon name="right" class="tw-w-5 tw-h-5 tw-text-blue_icon" />
        </router-link>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts" setup>
import BaseIcon from 'src/components/core/BaseIcon.vue'
const deleteIs = ref(false)
const logoutIs = ref(false)
const supportIs = ref(false)
const logout = () => {
  authStore().logout()
}
</script>
<style lang="scss" scoped></style>
