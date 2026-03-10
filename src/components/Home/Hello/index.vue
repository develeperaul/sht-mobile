<template>
  <div class="hello">
    <div class="logo-wrap">
      <img width="133" height="55" src="~/assets/images/logo.svg" alt="логотип" />
    </div>
    <div class="cover">
      <img class="cover-img" src="./decor.svg" />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
  .logo-wrap {
    width: 133px;
    margin: 0 auto;
  }

  .hello {

  }

  .cover {
    position: absolute;
    width: 100%;
    height: 475px;
    top: 0;
    left: 0;
    z-index: -1;
    background: linear-gradient(180deg, #C2DCFF 0%, #B1D5FE 24.37%, #F4F7FF 93.88%);
  }

  .cover-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
