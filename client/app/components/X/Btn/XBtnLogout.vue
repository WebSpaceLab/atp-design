<script lang="ts" setup>
  const { clear } = useAuthStore()
  const toasts = useToast()

  const logout = async () => {
    await clear()

    navigateTo('/', { replace: true })
    toasts.add({
      title: 'Logout',
      description: 'You have been logged out.',
      color: 'primary'
    })
  }
</script>

<template>
  <XBtn color="primary" variant="solid" icon="i-line-md-log-out" @click="logout" />
</template>