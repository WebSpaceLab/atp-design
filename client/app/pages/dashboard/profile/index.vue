<script lang="ts" setup>
  const { get } = useProfileStore()
  const { body, loading } = storeToRefs(useProfileStore()) as any

  onBeforeMount(async () => {
    await get()
  })

  definePageMeta({
    layout: 'authorization',
    middleware: "auth"
  })
</script>

<template>
  <XDashboardPage :loading="loading">
    <template #header-left />

    <template #main>
      <div  class="w-full p-6 flex flex-col space-y-8 box-border container mx-auto">
        <div class="w-full bg-secondary/20 dark:bg-secondary-dark/20 rounded-xl">
          <XDashboardProfileUpdatePicture v-if="body.avatarUrl !== ''" />
        </div>

        <div class="w-full bg-secondary/20 dark:bg-secondary-dark/20 rounded-xl">
          <XDashboardProfileUpdateInformation v-if="body.email !== '' || body.username" />
        </div>

        <div class="w-full bg-secondary/20 dark:bg-secondary-dark/20 rounded-xl">
          <XDashboardProfileUpdatePassword />
        </div>
      </div>
    </template>

    <template #sidebar />
  </XDashboardPage>
</template>