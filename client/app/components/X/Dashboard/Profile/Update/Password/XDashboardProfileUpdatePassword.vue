<script lang="ts" setup>

</script>

<template>
  <div class="relative w-full flex flex-col rounded-lg box-border">
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
  </div>
</template>