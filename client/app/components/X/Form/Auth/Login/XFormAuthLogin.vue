<script setup lang="ts">
const emit = defineEmits(['toggleModalRegisterToLogin'])
const canSeeThePassword = ref(false)

const props = defineProps({
  show: {
    type: Boolean,
  }
})

const form = useForm({
    email: '',
    password: ''
})

const toggleModalRegisterToLogin = (event: boolean) => {
  emit('toggleModalRegisterToLogin', event)
}

watch(() => props.show, (value) => {
  if (value === false) {
    form.reset()
  }
})
</script>

<template>
  <form class="relative w-full h-full flex flex-col" >    
    <div class="pt-5 space-y-8">
      <x-input
        v-model="form.body.email"
        label="Email"
        type="email"
        :color="$auth.errors && $auth.errors?.email ? 'error' : 'default'"
        icon
        name="email_login"
        :error="$auth.errors && $auth.errors?.email ? $auth.errors.email[0] : ''"
        autofocus
      >
        <template #icon>
          <Icon name="material-symbols:mark-email-unread-sharp" class="text-xl" />
        </template>
      </x-input>

      <div>
        <x-input
          v-model="form.body.password"
          :type="canSeeThePassword ? 'text' : 'password'"
          label="Hasło"
          :color="$auth.errors && $auth.errors?.password ? 'error' : 'default'"
          icon
          right-icon
          name="password_login"
          :error="$auth.errors && $auth.errors?.password ? $auth.errors?.password[0] : ''"
        >
          <template #icon>
            <Icon name="teenyicons:password-solid" class="text-xl" />
          </template>

          <template #right-icon>
            <Icon v-if="canSeeThePassword" @click="canSeeThePassword = false" name="mdi:eye-off-outline" class="text-xl text-blue-600 hover:text-green-600 cursor-pointer" />
            <Icon v-else @click="canSeeThePassword = true" name="mdi:eye-outline" class="text-xl hover:text-red-600 cursor-pointer" />
          </template>
        </x-input>

        <XModalAuthForgotPassword @toggle-modal-register-to-login="toggleModalRegisterToLogin" />
      </div>

      <div class="w-full space-y-6">
        <x-btn
          :disabled="(!form.body.email || !form.body.password)"
          type="submit"
          color="success"
          :loading="$auth.processing?.login"
          shadow
          block
        >
          Sige in
        </x-btn>
      </div>
    </div>        
  </form>
</template>