<script setup lang="ts">
  const { user } = useUserSession() as any
  const {updatePassword} = useProfileStore()

  const canSeeThePassword = ref(false)
  const canSeeTheConfirmPassword = ref(false)
  const canSeeTheCurrentPassword = ref(false)
  const isCorrectPassword = ref(false)
  const isCorrectConfirmPassword = ref(false)
  const isUpdated = ref(false)

  const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  }) as any

  watch(() => form.body.password, (value) => {
    if (value?.length >= 8) {
      isCorrectPassword.value = true
      form.errors = {}
    } else {
      isCorrectPassword.value = false
      form.errors = {password: 'Password must be at least 8 characters'}
    }
  })

  watch(() => form.body.password_confirmation, (value) => {
    if (value?.length >= 8) {
      if (form.body.password === value) {
        isCorrectConfirmPassword.value = true
        isUpdated.value = true
        form.errors = {}
      } else {
        isCorrectConfirmPassword.value = false
        isUpdated.value = false
        form.errors = {password_confirmation: 'Password confirmation does not match'}
      }
    } else {
      isCorrectConfirmPassword.value = false
      isUpdated.value = false
      form.errors = {password_confirmation: 'Password confirmation must be at least 8 characters'}
    }
  })
</script>

<template>
  <form class="space-y-6" @submit.prevent="updatePassword(user.iri, form)">
    <x-input
      v-model="form.body.current_password"
      :type="canSeeTheCurrentPassword ? 'text' : 'password'"
      :color="form.errors && form.errors?.current_password ? 'error' : 'default'"
      label="Password"
      icon="teenyicons:password-solid"
      name="register_password"
      right-icon
      :error="form.errors && form.errors?.current_password ? form.errors?.current_password : ''"
    >
      <template #right-icon>
        <Icon v-if="canSeeTheCurrentPassword" @click="canSeeTheCurrentPassword = false" name="mdi:eye-off-outline" class="text-xl text-blue-600 hover:text-green-600 cursor-pointer" />
        
        <Icon v-else @click="canSeeTheCurrentPassword = true" name="mdi:eye-outline" class="text-xl hover:text-red-600 cursor-pointer" />
      </template>
    </x-input>

    <x-input
      v-model="form.body.password"
      :type="canSeeThePassword ? 'text' : 'password'"
      :color="form.errors && form.errors?.password ? 'error' : 'default'"
      label="New password"
      icon="teenyicons:password-solid"
      name="register_password"
      right-icon
      :error="form.errors && form.errors?.password ? form.errors?.password : ''"
    >
      <template #right-icon>
        <div class="flex space-x-3">
          <icon v-if="isCorrectConfirmPassword" name="clarity:success-line" class="duration-300 text-xl text-success-600" />
          <Icon v-if="canSeeThePassword" @click="canSeeThePassword = false" name="mdi:eye-off-outline" class="text-xl text-blue-600 hover:text-green-600 cursor-pointer" />
          <Icon v-else @click="canSeeThePassword = true" name="mdi:eye-outline" class="text-xl hover:text-red-600 cursor-pointer" />
        </div>
      </template>
    </x-input>

    <div v-if="isCorrectPassword" class="transition-all duration-300 ">
      <x-input
        v-model="form.body.password_confirmation"
        :type="canSeeTheConfirmPassword ? 'text' : 'password'"
        :color="form.errors && form.errors?.password_confirmation ? 'error' : 'default'"
        label="Password confirmation"
        icon="teenyicons:password-solid"
        name="register_password_confirm"
        right-icon
        :error="form.errors && form.errors?.password_confirmation ? form.errors?.password_confirmation : ''"
      >
        <template #right-icon>
          <div class="flex space-x-3">
            <icon v-if="isCorrectConfirmPassword" name="clarity:success-line" class="duration-300 text-xl text-success-600" />

            <Icon v-if="canSeeTheConfirmPassword" @click="canSeeTheConfirmPassword = false" name="mdi:eye-off-outline" class="text-xl text-blue-600 hover:text-green-600 cursor-pointer" />
            
            <Icon v-else @click="canSeeTheConfirmPassword = true" name="mdi:eye-outline" class="text-xl hover:text-red-600 cursor-pointer" />
          </div>
        </template>
      </x-input>
    </div>

    <div class="flex items-center justify-end">
      <x-btn :disabled="!isUpdated" type="submit" color="primary" rounded="lg">
        <span class="mx-6 font-medium text-[15px]">Save</span>
      </x-btn>
    </div>
  </form>
</template>