<script setup lang="ts">
const { form, login } = useAuthStore() as any
  // const form = useForm({
  //   email: '',
  //   password: ''
  // }) as any  

  // const login = async () => {
  //   form.submit('/api/auth/login','POST', {
  //     success: () => {
  //       useModalHelper().toggleLoginModal()
  //       form.reset()
  //     },
  //   })
  // }
  const canSeeThePassword = ref(false)
</script>

<template>
  <form class="relative w-full h-full flex flex-col" @submit.prevent="login(form.body)" >    
    <div class="pt-5 space-y-8">
      <x-input
        v-model="form.body.email"
        label="Email"
        type="email"
        :color="form.errors && form.errors?.email ? 'error' : 'default'"
        icon="material-symbols:mark-email-unread-sharp"
        name="email_login"
        :error="form.errors && form.errors?.email ? form.errors.email : ''"
        autofocus
      />


      <div>
        <x-input
          v-model="form.body.password"
          :type="canSeeThePassword ? 'text' : 'password'"
          label="Hasło"
          :color="form.errors && form.errors?.password ? 'error' : 'default'"
          icon="teenyicons:password-solid"
          right-icon
          name="password_login"
          :error="form.errors && form.errors?.password ? form.errors?.password : ''"
        >
          <template #right-icon>
            <Icon v-if="canSeeThePassword" @click="canSeeThePassword = false" name="mdi:eye-off-outline" class="text-xl text-blue-600 hover:text-green-600 cursor-pointer" />
            <Icon v-else @click="canSeeThePassword = true" name="mdi:eye-outline" class="text-xl hover:text-red-600 cursor-pointer" />
          </template>
        </x-input>

        <XModalAuthForgotPassword  />
      </div>

      <div class="w-full space-y-6">
        <x-btn
          :disabled="(!form.body.email || !form.body.password)"
          type="submit"
          color="success"
          :loading="form.processing"
          shadow
          block
        >
          Sige in
        </x-btn>
      </div>
    </div>        
  </form>
</template>