<script setup>
  defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
  })
</script>

<template>
  <div
    class="w-screen h-screen bg-background dark:bg-background-dark min-h-screen flex flex-col justify-start items-center !m-0 !p-0 !box-border overflow-x-hidden">
    <div v-if="!loading" class="w-full h-full ">
      <slot />
    </div>

    <div v-else class="w-full relative h-screen flex justify-start items-center">
      <XSpinner :loading="loading" class="z-10" />
    </div>
  </div>
</template>