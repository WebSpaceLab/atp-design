<script lang="ts" setup>

</script>

<template>
  <x-card-action>
    <template #title>
      Password Update
    </template>

    <template #description>
      Make sure your account uses a password with more than 8 characters to maintain security.
    </template>

    <template #content>
      <XFormProfileUpdatedPassword />
    </template>
  </x-card-action>
</template>