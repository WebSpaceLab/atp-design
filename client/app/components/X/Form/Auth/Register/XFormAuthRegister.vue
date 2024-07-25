<script setup lang="ts">
let canSeeThePassword = ref(false)
let canSeeTheConfirmPassword = ref(false)
const isOpenAgreementModel = ref<boolean>(false)
const lang = ref<string>('en')

const props = defineProps({
  show: {
    type: Boolean,
  }
})

const form = useForm({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    isAgree: false
})

function agreement(value: boolean) {
    form.data.isAgree = value
  isOpenAgreementModel.value = false
}

watch(() => props.show, (value) => {
    if (value === false) {
       form.reset()
    }
})
</script>

<template>
<div>
  <form v-if="!$auth.response" class="relative flex flex-col w-full h-full">
    <div class="pt-5 space-y-8">
      <x-input
        v-model="form.data.username"
        :color="$auth.errors && $auth.errors?.username ? 'error' : 'default'"
        label="Nazwa"
        icon
        name="register_name"
        :error="$auth.errors && $auth.errors?.username ? $auth.errors?.username : ''"
        autofocus
      >
        <template #icon>
          <Icon name="material-symbols:person-3-rounded" class="text-xl" />
        </template>
      </x-input>

      <x-input
        v-model="form.data.email"
        :color="$auth.errors && $auth.errors?.email ? 'error' : 'default'"
        label="Email"
        icon
        type="email"
        name="register_email"
        :error="$auth.errors && $auth.errors?.email ? $auth.errors?.email : ''"
      >
        <template #icon>
          <Icon name="material-symbols:mark-email-unread-sharp" class="text-xl" />
        </template>
      </x-input>

      <x-input
        v-model="form.data.password"
        :type="canSeeThePassword ? 'text' : 'password'"
        :color="$auth.errors && $auth.errors?.password ? 'error' : 'default'"
        label="Hasło"
        icon
        name="register_password"
        right-icon
        :error="$auth.errors && $auth.errors?.password ? $auth.errors?.password : ''"
      >
        <template #icon>
          <Icon name="teenyicons:password-solid" class="text-xl" />
        </template>

        <template #right-icon>
          <div class="flex space-x-3">
            <Icon v-if="canSeeThePassword" @click="canSeeThePassword = false" name="mdi:eye-off-outline" class="text-xl text-blue-600 hover:text-green-600 cursor-pointer" />
            <Icon v-else @click="canSeeThePassword = true" name="mdi:eye-outline" class="text-xl hover:text-red-600 cursor-pointer" />
          </div>
        </template>
      </x-input>

      <x-input
        v-model="form.data.password_confirmation"
        :type="canSeeTheConfirmPassword ? 'text' : 'password'"
        :color="$auth.errors && $auth.errors?.password_confirmation ? 'error' : 'default'"
        label="Powtórz hasło"
        icon
        name="register_password_confirm"
        right-icon
        :error="$auth.errors && $auth.errors?.password_confirmation ? $auth.errors?.password_confirmation : ''"
      >
        <template #icon>
          <Icon name="teenyicons:password-solid" class="text-xl" />
        </template>

        <template #right-icon>
          <div class="flex space-x-3">
            <Icon v-if="canSeeTheConfirmPassword" @click="canSeeTheConfirmPassword = false" name="mdi:eye-off-outline" class="text-xl text-blue-600 hover:text-green-600 cursor-pointer" />
            <Icon v-else @click="canSeeTheConfirmPassword = true" name="mdi:eye-outline" class="text-xl hover:text-red-600 cursor-pointer" />
          </div>
        </template>
      </x-input>

      <div class="flex flex-col">
        <div class="flex items-center">
          <input id="link-checkbox" type="checkbox" v-model="form.data.isAgree" class="w-4 h-4 text-blue-600 bg-blue-300 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
          
          <label for="link-checkbox" class="text-sm font-medium  text-gray-900 dark:text-gray-300">      
            <span class="flex items-center justify-center translate-x-3 italic">I accept the 
              <x-btn variant="ghost" label="Terms and Conditions" size="sm" @click="isOpenAgreementModel = true" />
            </span>
          </label>
        </div>

        <div v-if="$auth.errors && $auth.errors?.isAgree" class="w-full text-center text-error-900 text-[14px] font-semibolds bg-error-300 p-2 box-border mt-1 rounded">{{ $auth.errors?.isAgree }}</div>
      </div>

      <div class="w-full space-y-6">
        <x-btn
          :loading="$auth.processing?.register"
          type="submit"
          label="Register"
          class="w-full"
          color="success"
          shadow
          block
          :disabled="!form.data.isAgree || form.data.password !== form.data.password_confirmation || form.data.password.length < 8 || form.data.password_confirmation.length < 8 || form.data.username.length < 3 || form.data.email.length < 3 || form.data.username.length > 20 || form.data.email.length > 50"
        /> 
      </div>
    </div>        
  </form>
  
  <div v-else class="px-10 py-20 text-xl text-bold text-info-900 bg-info-300 rounded-xl shadow-2xl shadow-black transition-all duration-500">
    {{ $auth.response?.status }}
  </div>  

  <XModal :show="isOpenAgreementModel">
    <div class="w-full relative  p-4">
      <div class="absolute top-2 right-4 flex items-center space-x-2">
        <p class="text-sm text-basic dark:text-basic-dark text-bold">lang:</p>

        <select v-model="lang" label="Language"  />
      </div>

      <h2 class="text-xl font-semibold pb-4 text-basic dark:text-basic-dark">Terms and Conditions</h2>

      <div class="w-full overflow-y-auto h-80  p-4 bg-gray-300 text-justify rounded">
        <ContentDoc :path="`/terms/${lang}`" />
      </div>

      <div class="w-full mt-4 flex justify-between">
        <x-btn variant="solid" color="red" label="Odrzuć" @click="agreement(false)" />

        <x-btn variant="solid" color="primary" label="Zgadzam się" @click="agreement(true)" />
      </div>
    </div>
  </XModal>
</div>

</template>