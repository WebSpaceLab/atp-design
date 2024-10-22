<script lang="ts" setup>
  const logout = async () => {
    await useAuthStore().logout()
  }
</script>

<template>
  <XBtn class="z-40" color="primary" variant="solid" icon="i-line-md-log-out"  label="Log Out" block @click="logout" />
</template>