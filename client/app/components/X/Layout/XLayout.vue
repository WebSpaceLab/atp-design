<script setup lang="ts">

</script>

<template>
  <div class="relative w-full h-full box-border">
    <div class="w-full h-full flex flex-col justify-between items-center">
      <x-header>
        <slot name="header" />
      </x-header>
  
      <main class="w-full h-full py-8 box-border relative flex justify-center items-start duration-500">
        <slot name="main" />
      </main>

      <x-footer>
        <slot name="footer" />
      </x-footer>
    </div>
    <slot name="addons" />
  </div>
</template>