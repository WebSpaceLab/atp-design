<script lang="ts" setup>
  const { session } = useAuthStore()

  const links = ref([
    {
      label: 'Home',
      name: 'index',
      icon: 'i-heroicons-home',
      to: '/'
    },
    {
      label: 'About',
      name: 'about',
      icon: 'i-heroicons-book-open',
      to: '/about'
    },
    {
      label: 'Contact',
      name: 'contact',
      icon: 'i-heroicons-rocket-launch',
      to: '/contact'
    }])

</script>

<template>
  <XLayout>
    <template #header>
      <XNavbar :links="links" container>
        <template #logo>
          <XLogo />
        </template>

        <template #action>
          <div v-if="!session.loggedIn" class="flex space-x-3">
            <XModalAuthLogin/>
            <XModalAuthRegister/>
          </div>

          <div v-else class="h-full flex items-center justify-center" >
            <x-dropdown-manage-account v-if="session.user" :user="session.user" />
          </div>
        </template>
      </XNavbar>
    </template>

    <template #main>
      <slot />
    </template>

    <template #footer>

    </template>
  </XLayout>
</template>