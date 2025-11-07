<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <!-- <div class="custom-select" :tabindex="tabindex"> -->
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ label }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    default: {
      type: String,
      required: true,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      label: this.default
        ? this.default
        : this.options.length > 0
          ? this.options[0]
          : null,
      open: false,
    }
  },
}
</script>

<style scoped>
.custom-select {
  @apply p1;
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  min-height: 60px;
}

.custom-select .selected {
  @apply tw-bg-blue_bg;
  overflow: hidden;
  padding-left: 20px;
  cursor: pointer;
  user-select: none;
  border-radius: 50px;
  height: 60px;
  display: flex;
  align-items: center;
}

.custom-select .selected.open {
  border-radius: 30px 30px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: '';
  top: 8px;
  /* transform: translateY(-50%); */
  right: 8px;
  width: 44px;
  height: 44px;
  background-color: #fff;
  border-radius: 9999px;
  background-image: url('data:image/svg+xml,<svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.69999L7.4 8.29999L0.800001 1.69999" stroke="%23161616" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 13.2px 6.6px;
  transition: all 0.3s;
}

.custom-select .selected.open::after {
  transform: rotate(180deg);
}

.custom-select .items {
  @apply tw-bg-blue_bg;
  z-index: 11;
  border-radius: 0px 0px 30px 30px;
  overflow: hidden;

  left: 0;
  right: 0;
  padding-bottom: 18px;
}

.custom-select .items {
  padding-left: 20px;
  cursor: pointer;
  user-select: none;
}

.selectHide {
  display: none;
}
</style>
