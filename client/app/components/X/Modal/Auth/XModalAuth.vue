<script lang="ts" setup>
const  isShowLogin = ref(false)
const isShowRegister = ref(false)

function toggleLogin (event: boolean) {
  isShowLogin.value = event
}

function toggleRegister(event: boolean) {
  isShowRegister.value = event
}


function toggleModalRegisterToLogin (event: boolean) {
  isShowLogin.value = computed(() => !isShowLogin.value).value
  isShowRegister.value = computed(() => !isShowRegister.value).value
}
</script>

<template>
  <div class="flex space-x-3">
    <XTooltip  text="Login">
      <XBtn variant="ghost" color="primary" icon="i-line-md-person-filled" square
        @click="toggleLogin(true)" />
    </XTooltip>
  
    <XTooltip text="Register">
      <XBtn variant="ghost" color="primary" icon="i-line-md-person-add-filled" square @click="toggleRegister(true)" />
    </XTooltip>
  
    <XModal :show="isShowLogin" :closeable="true" max-width="md"
      @close="toggleLogin">
      <div class="w-120 relative flex flex-col justify-center pt-16 px-8 pb-8">
        <div class="absolute top-2 right-2">
          <XBtnCloseToOpen :switcher="isShowLogin" @click="toggleLogin(false)" />
        </div>
  
        <div class="text-center pb-8">
          <!-- @vue-ignore -->
          <Icon name="i-line-md-person-filled" class="text-7xl text-center text-primary"  />
          
          <h2 class="text-primary-900 dark:text-primary-100 text-center text-3xl font-semibold">Welcome back!</h2>
  
          <div class="text-basic-900 dark:text-basic-400 flex justify-center items-center">
  
            <p>Don't have an account?</p>
  
            <XBtn variant="link" label="Sign Up" @click="toggleModalRegisterToLogin(true)" />
          </div>
        </div>

        <XFormAuthLogin :show="isShowLogin" @toggle-modal-register-to-login="toggleModalRegisterToLogin" />
  
        <XDivider label="OR" class="py-4" />
  
        <div class="space-y-4 flex flex-col justify-center">
          <XBtn color="red" icon="i-logos-google-icon" icon-position="right" block shadow>
            <p class="text-white text-md text-bold">Login with Google</p>
          </XBtn>
        </div>
      </div>
    </XModal>
  
    <XModal :show="isShowRegister" :closeable="true" :overflow-hidden="false"
      @close="toggleRegister">
      <div class="w-120  relative flex flex-col justify-center pt-12 px-8 pb-6">
        <div class="absolute top-3 right-4">
          <XBtnCloseToOpen :switcher="isShowRegister" @click="toggleRegister(false)" />
        </div>
  
        <div class="text-center pb-8">
          <!-- @vue-ignore -->
          <Icon name="i-line-md-person-add-filled" class="text-7xl text-center text-primary" />
  
          <h1 class="text-primary-900 dark:text-primary-100 text-center text-3xl font-semibold">Register</h1>
  
          <h2 class="text-basic-700 dark:text-basic-300 flex justify-center items-center">
  
            <p>You already have an account?</p>
  
            <XBtn variant="link" label="Log in" @click="toggleModalRegisterToLogin(false)" />
          </h2>
        </div>

        <XFormAuthRegister :show="isShowRegister" />
  
      </div>
    </XModal>
  </div>
</template>