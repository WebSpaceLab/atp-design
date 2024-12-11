<template>
  <XTooltip :text="colorMode.value === 'dark' ? 'Change theme to light' : 'Change theme to dark'">
    <XBtn
      color="primary"
      variant="ghost"
      square
      @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
    >
      <!-- Użyj stałej nazwy ikony lub dostosuj ją w zależności od aktualnego trybu -->
      <NuxtIcon
        :name="colorMode.value === 'dark' 
          ? 'i-line-md-moon-filled-loop'
          : 'i-line-md-sunny-filled-loop'"
        class="text-xl"
      />
    </XBtn>
  </XTooltip>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
</script> 