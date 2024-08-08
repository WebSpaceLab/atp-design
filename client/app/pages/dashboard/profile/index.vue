<script lang="ts" setup>
  definePageMeta({
    layout: 'authorization',
    middleware: "auth"
  })

  const { user, session } = useUserSession()
  const { me } = useProfileStore()
  await me(user.value.iri)

</script>

<template>
  <XDashboardPage>
    <template #header-left />

    <template #main>
      <div
        class="w-full p-6 flex flex-col space-y-8 box-border container mx-auto bg-secondary/20 dark:bg-secondary-dark/20 rounded-xl">
        <div class="w-full">
          <XDashboardProfileUpdateInformation />
        </div>

        <div class="w-full">
          <XDashboardProfileUpdatePassword />
        </div>
      </div>
    </template>

    <template #sidebar />
  </XDashboardPage>
</template>