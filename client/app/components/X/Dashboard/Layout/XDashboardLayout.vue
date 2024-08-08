<script setup lang="ts">
  const { sidebar } = useSidebar()
</script>

<template>
  <div class="relative w-full h-full box-border">
    <div class="w-full h-full flex flex-col justify-between  items-center">
      <x-header>
        <slot name="header" />
      </x-header>

      <main class="w-full h-full box-border relative flex duration-500  " :class="[
        sidebar.isRightSide ? 'justify-start' : 'justify-end',
      ]">
        <XDashboardSidebar />
        <slot name="main" />
      </main>
    </div>
  </div>
</template>
