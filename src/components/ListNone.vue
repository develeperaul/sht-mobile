<template>
<div class=" tw-grid tw-gap-4 tw-justify-items-center tw-text-center tw-p-6 glass-w tw-rounded-32 tw-mb-10" >
  <div class=" h3">
    Раздел пока пуст
  </div>
  <div class=" p2">
    Чтобы появилось путешествие, <br> необходимо забронировать поездку
  </div>
  <router-link :to="{name: 'search.index'}" class="btn-to">
    К направлениям
  </router-link>
</div>
</template>

<style lang='scss' scoped>
.list-none {

}
</style>
