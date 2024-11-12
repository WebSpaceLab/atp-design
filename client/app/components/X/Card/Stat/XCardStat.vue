<script lang="ts" setup>
  defineProps({
    title: String,
    value: String,
  });
</script>

<template>
  <div class="p-6 rounded-lg shadow-xl shadow-black ">
    <h3 class="text-lg font-semibold">{{ title }}</h3>
    <p class="text-2xl font-bold mt-4">{{ value }}</p>
  </div>
</template>