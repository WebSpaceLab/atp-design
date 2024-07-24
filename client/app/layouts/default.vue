<script lang="ts" setup>
  const { toggleLoginModal, toggleRegisterModal } = useUseAuthTools()

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
    // {
    //   label: 'Dashboard',
    //   name: 'dashboard',
    //   icon: 'i-heroicons-square-3-stack-3d',
    //   to: '/dashboard',
    //   children: [{
    //     label: 'Profile',
    //     name: 'dashboard-profile',
    //     to: '/dashboard/profile',
    //     icon: 'i-heroicons-ticket',
    //     description: 'User profile'
    //   }, {
    //     label: 'Users',
    //     name: 'dashboard-users',
    //     to: '/dashboard/users',
    //     icon: 'i-heroicons-ticket',
    //     description: 'Users list'
    //   }]
    // }, 
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
      <XNavbar container>
        <template #logo>
          <XLogo />
        </template>

        <template #menu>
          <XNavbarMenu :links="links" />
        </template>

        <template #action>
          <div class="flex space-x-3">
            <XTooltip  text="Login">
              <XBtn variant="ghost" color="primary" icon="i-line-md-person-filled" square
                @click="toggleLoginModal(true)" />
            </XTooltip>

            <XTooltip text="Register">
              <XBtn variant="ghost" color="primary" icon="i-line-md-person-add-filled"" square @click="
                toggleRegisterModal(true)" />
            </XTooltip>
          </div>

          <!-- Auth buttons 
            <XDropdownManageAccount v-else />
          -->
        </template>
      </XNavbar>
    </template>

    <template #main>
      <slot />
    </template>

    <template #footer>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © 2024-{{ new Date().getFullYear() }} ATP - <NuxtLink class="hover:underline"
          to="https://github.com/nuxt/nuxt/blob/main/LICENSE" target="_blank">
          MIT License
        </NuxtLink>
      </p>
    </template>

    <template #addons>
      <XModalRegister />

      <XModalLogin />
    </template>
  </XLayout>
</template>