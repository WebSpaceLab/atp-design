<script lang="ts" setup>
  definePageMeta({
    layout: "default",
  })

  const { name, version } = storeToRefs(useAppStore())
</script>

<template>
  <div>
    <h1 class="text-2xl">Home Page</h1>

    <p class="m-3">
      This is the home page of the <strong>{{ name }}</strong> app.
    </p>

    <p class="m-3">
      Version: <strong>{{ version }}</strong>
    </p>

    <p class="m-3">
      <nuxt-link to="/about">Go to the About page</nuxt-link>
    </p>
  </div>
</template>