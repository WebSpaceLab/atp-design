<script lang="ts" setup>
  let { $get } = useApi()

  const logout = async () => {
    $get('/api/auth/logout')
  }
</script>

<template>
  <XBtn class="z-40" color="primary" variant="solid" icon="i-line-md-log-out"  label="Log Out" block @click="logout" />
</template>