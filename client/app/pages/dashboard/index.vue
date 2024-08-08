<script lang="ts" setup>
  definePageMeta({
    layout: 'authorization',
    middleware: "auth"
  })
  const { loggedIn, user, session, fetch, clear } = useUserSession()
</script>

<template>

  <XDashboardPage>
    <template #header-panel />

    <template #main>
      <h1>
        Dashboard
      </h1>

      <div>
        Dashboard {{ user }}
        <div>
          session: {{ session }}

        </div>
        loggedIn: {{ loggedIn }}
      </div>

      <div class="w-full h-screen" />
    </template>

    <template #sidebar />
  </XDashboardPage>
</template>