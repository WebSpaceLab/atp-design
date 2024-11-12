<script setup lang="ts">
const app = useAppStore()

onMounted(() => {
  app.start()
})

useSeoMeta({
  title: 'ATP - Advanced Training Platform',
  description: 'ATP (Advanced Training Platform) is a comprehensive and modern fitness platform designed to help users create personalized training plans, analyze their progress, and maintain a workout journal. Our mission is to support users in achieving their fitness goals by providing precise and effective tools.',
})
</script>

<template>
  <x-app :loading="false">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <x-toast />
  </x-app>
</template>
