<script lang="ts" setup>
const { toggleRegister, toggleModalRegisterToLogin } = useRegisterStore()
const { isShowRegister } = storeToRefs(useRegisterStore())
</script>

<template>
  <XTooltip text="Register">
    <XBtn variant="ghost" color="primary" icon="i-line-md-person-add-filled" square @click="toggleRegister(true)" />
  </XTooltip>

  <XModal :show="isShowRegister" :closeable="true" :overflow-hidden="false">
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

          <XBtn variant="link" label="Log in" @click="toggleModalRegisterToLogin()" />
        </h2>
      </div>

      <XFormAuthRegister :show="isShowRegister" @close="toggleRegister" />
    </div>
  </XModal>
</template>