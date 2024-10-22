<script setup>
</script>

<template>
  <div class="relative bg-prime-light dark:bg-prime-dark w-full p-4 rounded-lg md:grid md:grid-cols-3 md:gap-6 box-border">
    <XCardActionHeader>
      <template #title>
        <slot name="title" />
      </template>
      <template #description>
        <slot name="description" />
      </template>
    </XCardActionHeader>

    <div class="mt-5 md:mt-0 px-4 py-5 sm:p-6 md:col-span-2 box-border bg-secondary dark:bg-secondary-dark p-6 rounded-xl">
      <slot name="content" />
    </div>
  </div>
</template>