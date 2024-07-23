<script lang="ts" setup>
  defineProps({
    switcher: {
      type: Boolean,
      default: false,
    },
  })
</script>

<template>
  <XBtn color="primary" variant="ghost" square
    :icon="switcher ? 'i-line-md-menu-to-close-transition' : 'i-line-md-close-to-menu-transition'" />
</template>
