<template>
  <q-page class="tw-container tw-grid tw-content-between">
    <div>
      <head-block-profile class="tw-mb-[5px]" />
      <div class="tw-bg-white tw-rounded-32 tw-px-2.5">
        <router-link
          :to="{ name: 'data' }"
          class="tw-flex tw-items-center tw-justify-between tw-h-[55px] p1"
        >
          <div class="tw-flex tw-gap-2 tw-items-center">
            <BaseIcon name="profile" class="tw-w-6 tw-h-6 tw-text-blue_icon" />
            <div>Личные данные</div>
          </div>
          <BaseIcon name="right" class="tw-w-5 tw-h-5 tw-text-blue_icon" />
        </router-link>
        <div class="tw-border-b tw-border-blue_bg"></div>
        <router-link
          :to="{ name: 'mytravel' }"
          class="tw-flex tw-items-center tw-justify-between tw-h-[55px] p1"
        >
          <div class="tw-flex tw-gap-2 tw-items-center">
            <BaseIcon name="loсation" class="tw-w-6 tw-h-6 tw-text-blue_icon" />
            <div>Мои путешествия</div>
          </div>
          <BaseIcon name="right" class="tw-w-5 tw-h-5 tw-text-blue_icon" />
        </router-link>
        <div class="tw-border-b tw-border-blue_bg"></div>
        <div
          class="tw-flex tw-items-center tw-justify-between tw-h-[55px] p1"
          @click="supportIs = true"
        >
          <div class="tw-flex tw-gap-2 tw-items-center">
            <BaseIcon name="help" class="tw-w-6 tw-h-6 tw-text-blue_icon" />
            <div>Поддержка</div>
          </div>
          <BaseIcon name="right" class="tw-w-5 tw-h-5 tw-text-blue_icon" />
        </div>
        <div class="tw-border-b tw-border-blue_bg"></div>
        <div class="tw-flex tw-items-center tw-justify-between tw-h-[55px] p1">
          <div class="tw-flex tw-gap-2 tw-items-center">
            <BaseIcon name="list" class="tw-w-6 tw-h-6 tw-text-blue_icon" />
            <div>Документы</div>
          </div>
          <BaseIcon name="right" class="tw-w-5 tw-h-5 tw-text-blue_icon" />
        </div>
        <div class="tw-border-b tw-border-blue_bg"></div>

        <router-link
          :to="{ name: 'contacts' }"
          class="tw-flex tw-items-center tw-justify-between tw-h-[55px] p1"
        >
          <div class="tw-flex tw-gap-2 tw-items-center">
            <BaseIcon
              name="location2"
              class="tw-w-6 tw-h-6 tw-text-blue_icon"
            />
            <div>Контакты</div>
          </div>
          <BaseIcon name="right" class="tw-w-5 tw-h-5 tw-text-blue_icon" />
        </router-link>
      </div>
    </div>
    <div class="tw-flex tw-gap-2 tw-mb-[13px]">
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

    <Teleport to="body">
      <Transition name="fade">
        <div class="popup" v-if="deleteIs">
          <div class="popup__wrapper">
            <div
              class="tw-bg-white tw-py-8 tw-px-5 tw-rounded-32 tw-text-center"
            >
              <div class="h2 tw-object-center tw-mb-4">
                Вы действительно хотите удалить аккаунт?
              </div>
              <div class="p1 tw-text-center tw-mb-4">
                После удаления аккаунт будет невозможно восстановить
              </div>
              <div class="tw-grid tw-grid-cols-2">
                <div
                  class="tw-text-center tw-font-semibold tw-text-base"
                  @click="deleteIs = false"
                >
                  Отменить
                </div>
                <div
                  class="tw-text-center tw-font-semibold tw-text-base tw-text-red"
                  @click="logout"
                >
                  Удалить
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
    <Teleport to="body">
      <Transition name="fade">
        <div class="popup" v-if="logoutIs">
          <div class="popup__wrapper">
            <div
              class="tw-bg-white tw-py-8 tw-px-5 tw-rounded-32 tw-text-center"
            >
              <div class="h2 tw-object-center tw-mb-4">
                Вы действительно хотите выйти?
              </div>
              <div class="tw-grid tw-grid-cols-2">
                <div
                  class="tw-text-center tw-font-semibold tw-text-base"
                  @click="logoutIs = false"
                >
                  Отменить
                </div>
                <div
                  class="tw-text-center tw-font-semibold tw-text-base tw-text-red"
                  @click="logout"
                >
                  Выйти
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
    <SupportPopup v-model="supportIs" />
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
