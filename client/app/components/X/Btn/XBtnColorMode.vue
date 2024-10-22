<script lang="ts" setup>
  const setColorTheme = (newTheme: string) => {
    useColorMode().preference = newTheme
  }
</script>

<template>
  <XTooltip :text="`Change theme to ${$colorMode.value == 'dark' ? 'light' : 'dark'}`">
    <XBtn 
      color="primary" 
      variant="ghost" 
      square
      :icon="$colorMode.value == 'dark' ? 'i-line-md-moon-filled-loop' : 'i-line-md-moon-filled-to-sunny-filled-loop-transition'"
      @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')" 
    />
  </XTooltip>
</template>
