<script setup>
  defineProps({
    loading: {
      type: Boolean,
      default: true,
    },
  })
</script>

<template>
    <div
        v-if="loading"
        class="z-10 w-full h-screen flex items-center justify-center "
    >
        <XSpinner :loading="loading"/>
    </div>
</template>