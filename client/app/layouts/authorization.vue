<script lang="ts" setup>
const { sidebar } = useSidebar()
const { openSearchModal } = useSearch()
const { user } = useUserSession()

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

        <template #content/>

        <template #action>
          <XTooltip text="Search" position="bottom">
            <XBtn @click="openSearchModal()" color="primary" variant="ghost" square icon="i-line-md-search" />
          </XTooltip>

          <XDropdownManageAccount v-if="user" :user="user" />
        </template>
      </XDashboardNavbar>
    </template>

    <template #main>
        <slot />
    </template>
  </XDashboardLayout>
</template>
