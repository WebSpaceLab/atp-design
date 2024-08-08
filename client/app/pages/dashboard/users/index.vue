<script lang="ts" setup>
  definePageMeta({
    layout: 'authorization',
    middleware: "auth"
  })

  const { user, session } = useUserSession()
</script>

<template>
  <XDashboardPage>
    <template #header-left />

    <template #main>
      <h1 class="">
        Profile
      </h1>

      <div>
        user: {{ user }}
      </div>

      <div>
        role: {{ session.role }}
      </div>
    </template>

    <template #sidebar />
  </XDashboardPage>
</template>