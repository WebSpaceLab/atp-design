<script lang="ts" setup>
const { sidebar } = useSidebar()
const { session } = storeToRefs(useAuthStore())

let query = ref('')
</script>

<template>
  <XDashboardLayout>
    <template #header>
      <XDashboardNavbar>
        <template #bar>
          <div
              class="flex justify-start px-4 space-x-2"
              :class="[sidebar.isRail ? '' : 'w-64']"
          >
        
          </div>
        </template>

        <template #content>
          <div class="flex justify-center items-center">
            <h1 class="text-2xl font-bold">Authorization</h1>
          </div>
        </template>
        
        <template #action>


          <XDropdownManageAccount v-if="session" :user="session.user" />
        </template>
      </XDashboardNavbar>
    </template>

    <template #main>
        <slot />
    </template>
  </XDashboardLayout>
</template>
