<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected?.name ? selected.name : selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="((selected = option), (open = false), $emit('input', option))"
      >
        {{ option?.name ? option.name : option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    update: {
      type: String,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
          ? this.options[0]
          : null,
      open: false,
    }
  },
  mounted() {
    // this.$emit('input', this.selected)
  },
  watch: {
    update: {
      handler(nv, ov) {
        console.log(nv)

        this.$emit('input', null)
        this.selected = this.default
          ? this.default
          : this.options.length > 0
            ? this.options[0]
            : null
      },
    },
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
  height: 50px;
  line-height: 50px;
}

.custom-select .selected {
  @apply tw-bg-white tw-rounded-32;
  overflow: hidden;
  padding-left: 20px;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border-radius: 24px 24px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: '';
  top: 22px;
  right: 1em;
  width: 13.2px;
  height: 6.6px;

  background-image: url('data:image/svg+xml,<svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.69999L7.4 8.29999L0.800001 1.69999" stroke="%23161616" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  background-repeat: no-repeat;
  background-size: contain;
  transition: all 0.3s;
}

.custom-select .selected.open::after {
  transform: rotate(180deg);
}

.custom-select .items {
  @apply tw-bg-white tw-z-10;

  border-radius: 0px 0px 24px 24px;
  overflow: hidden;

  position: absolute;

  left: 0;
  right: 0;
}

.custom-select .items div {
  padding-left: 20px;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: #d2e0f2;
}

.selectHide {
  display: none;
}
</style>
