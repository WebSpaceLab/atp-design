<script lang="ts" setup>
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
      <XNavbar :links="links" container>
        <template #logo>
          <XLogo />
        </template>

        <template #action>
          <div class="flex space-x-3">
            <XModalAuthLogin/>
            <XModalAuthRegister/>
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

    </template>
  </XLayout>
</template>