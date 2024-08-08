<script setup lang="ts">
  const { update } = useProfileStore()
  const { form } = storeToRefs(useProfileStore()) as any
  const { user } = useUserSession() as any
</script>

<template>
  <form class="flex flex-col space-y-6" @submit.prevent="update(user.iri, form.body)">
    <x-card-action>
      <template #title>
        Username
      </template>

      <template #description>
        Usernames can only contain letters, numbers, underscores, and dots.
        Changing the username will also change the profile link.
      </template>

      <template #content>
        <x-input v-model="form.body.username" :color="form.errors && form.errors?.username ? 'error' : 'default'"
          label="Username" icon="material-symbols:person-3-rounded" name="profile_name"
          :error="form.errors && form.errors?.username ? form.errors?.username : ''" autofocus />
      </template>
    </x-card-action>
    <x-card-action>
      <template #title>
        Email
      </template>

      <template #description>
        Your email address is used to log in and receive notifications.
      </template>

      <template #content>
        <x-input v-model="form.body.email" :color="form.errors && form.errors?.email ? 'error' : 'default'"
          label="Email" icon="material-symbols:mark-email-unread-sharp" name="profile_email"
          :error="form.errors && form.errors?.email ? form.errors?.email : ''" autofocus />
      </template>
    </x-card-action>

    <x-card-action>
      <template #title>
        First name
      </template>

      <template #description>
        Your first name is used to personalize your experience.
      </template>

      <template #content>
        <div class="flex flex-col space-y-6">
          <x-input v-model="form.body.firstName" :color="form.errors && form.errors?.firstName ? 'error' : 'default'"
            label="First name" icon="material-symbols:person-3-rounded" name="profile_firstName"
            :error="form.errors && form.errors?.firstName ? form.errors?.firstName : ''" autofocus />

          <x-input v-model="form.body.lastName" :color="form.errors && form.errors?.lastName ? 'error' : 'default'"
            label="Last name" icon="material-symbols:person-3-rounded" name="profile_firstName"
            :error="form.errors && form.errors?.lastName ? form.errors?.lastName : ''" autofocus />
        </div>
      </template>
    </x-card-action>

    <x-card-action>
      <template #title>
        Bio
      </template>

      <template #description>
        Write a short bio about yourself.
      </template>

      <template #content>
        <x-textarea v-model="form.body.bio" :cols="30" :rows="4" label="Bio" name="textarea_user-description"
          :error="form.errors && form.errors?.bio ? form.errors?.bio : ''" />
      </template>
    </x-card-action>

    <div class="flex items-center justify-end px-10">
      <x-btn type="submit" color="primary" rounded="lg">
        <span class="mx-6 font-medium text-[15px]">Save</span>
      </x-btn>
    </div>
  </form>
</template>