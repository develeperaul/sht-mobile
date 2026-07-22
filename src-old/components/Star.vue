<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1_320)">
      <path
        d="M10 16.3566L16.1803 19.6552L15 12.6685L20 7.72073L13.09 6.7014L10 0.344818L6.91002 6.7014L0 7.72073L5 12.6685L3.81971 19.6552L10 16.3566Z"
        :fill="active ? '#FCDF3A' : ''"
        :stroke="!active ? '#FCDF3A' : ''"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_320">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    active?: boolean
  }>(),
  {
    active: false,
  }
)
</script>
<style lang="scss" scoped></style>
