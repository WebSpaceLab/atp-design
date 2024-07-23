<script lang="ts" setup>
  const color = ref('red');
  function classColor(c: string) {
    return {
      "red": "text-red-800",
    }[c];
  }

  definePageMeta({
    layout: "default",
  });
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline" :class="[classColor(color)]">
      Hello world!
    </h1>

    <x-btn color="primary" size="md" variant="outline" rounded="md" icon="i-heroicons-pencil-square"
      icon-position="right">Baton</x-btn>
  </div>
</template>