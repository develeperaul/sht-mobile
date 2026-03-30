<template>
  <q-page class="tw-container env-t tw-grid tw-content-between tw-pb-[100px]">
    <div>
      <head-block-profile class="tw-mb-[11px]" />
      <div class=" tw-rounded-[24px] tw-px-2.5 glass-w" style="">
        <router-link
          :to="{ name: 'data' }"
          class="tw-flex tw-items-center tw-justify-between tw-h-[55px] p1"
        >
          <div class="tw-flex tw-gap-2 tw-items-center">
            <BaseIcon name="profile" class="tw-w-6 tw-h-6 tw-text-blue_icon2" />
            <div>Личные данные</div>
          </div>
          <BaseIcon name="right" class="tw-w-5 tw-h-5 tw-text-blue_icon2" />
        </router-link>
        <div class="tw-border-b tw-border-blue_bg"></div>
        <router-link
          :to="{ name: 'mytravel' }"
          class="tw-flex tw-items-center tw-justify-between tw-h-[55px] p1"
        >
          <div class="tw-flex tw-gap-2 tw-items-center">
            <BaseIcon name="loсation" class="tw-w-6 tw-h-6 tw-text-blue_icon2" />
            <div>Мои путешествия</div>
          </div>
          <BaseIcon name="right" class="tw-w-5 tw-h-5 tw-text-blue_icon2" />
        </router-link>
        <div class="tw-border-b tw-border-blue_bg"></div>
        <div
          class="tw-flex tw-items-center tw-justify-between tw-h-[55px] p1"
          @click="supportIs = true"
        >
          <div class="tw-flex tw-gap-2 tw-items-center">
            <BaseIcon name="help" class="tw-w-6 tw-h-6 tw-text-blue_icon2" />
            <div>Поддержка</div>
          </div>
          <BaseIcon name="right" class="tw-w-5 tw-h-5 tw-text-blue_icon2" />
        </div>
        <div class="tw-border-b tw-border-blue_bg"></div>
        <router-link
          :to="{ name: 'docs' }"
          class="tw-flex tw-items-center tw-justify-between tw-h-[55px] p1"
        >
          <div class="tw-flex tw-gap-2 tw-items-center">
            <BaseIcon name="list" class="tw-w-6 tw-h-6 tw-text-blue_icon2" />
            <div>Документы</div>
          </div>
          <BaseIcon name="right" class="tw-w-5 tw-h-5 tw-text-blue_icon2" />
        </router-link>
        <div class="tw-border-b tw-border-blue_bg"></div>

        <router-link
          :to="{ name: 'contacts' }"
          class="tw-flex tw-items-center tw-justify-between tw-h-[55px] p1"
        >
          <div class="tw-flex tw-gap-2 tw-items-center">
            <BaseIcon
              name="location2"
              class="tw-w-6 tw-h-6 tw-text-blue_icon2"
            />
            <div>Контакты</div>
          </div>
          <BaseIcon name="right" class="tw-w-5 tw-h-5 tw-text-blue_icon2" />
        </router-link>
      </div>
    </div>
    <div class="tw-flex tw-gap-2">
      <div
        class="tw-text-red tw-h-[60px] tw-outline tw-outline-[1px] tw-outline-transparent hover:tw-outline-red tw-flex tw-justify-center tw-items-center tw-bg-white tw-rounded-[90px] p1 tw-w-full"
        @click="deleteIs = true"
      >
        Удалить аккаунт
      </div>
      <div
        class="tw-text-blue_link tw-outline tw-outline-[1px] tw-outline-blue_link tw-h-[60px] tw-flex tw-justify-center tw-items-center tw-bg-white tw-rounded-[90px] p1 tw-w-full"
        @click="logoutIs = true"
      >
        Выйти из аккаунта
      </div>
    </div>
    <DeletePopup v-model="deleteIs" @remove="logout"/>
    <LogoutPopup v-model="logoutIs" @logout="logout"/>
    <SupportPopupNew v-model="supportIs" />
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
