<script lang="ts" setup>


</script>

<template>
  <XModal :show="$auth.modal.isShowLogin" :closeable="true" :overflow-hidden="false"
    @close="(event) => $auth.toggleLoginModal(event)">
    <div class="w-120 relative flex flex-col justify-center pt-16 px-8 pb-8">
      <div class="absolute top-2 right-2">
        <XBtnCloseToOpen :switcher="$auth.modal.isShowLogin" @click="$auth.closeLoginModal()" />
      </div>

      <div class="text-center pb-8">
        <Icon name="i-line-md-person-filled" class="text-7xl text-center text-primary" />
        <h2 class="text-center text-3xl font-semibold">Welcome back!</h2>

        <div class="flex justify-center items-center">

          <p>Don't have an account?</p>

          <XBtn variant="link" label="Sign Up" @click="$auth.toggleRegisterToLogin()" />
        </div>
      </div>
      <!--
  <XFormLogin />
-->

      <XDivider label="OR" class="py-4" />

      <div class="space-y-4 flex flex-col justify-center">
        <XBtn color="red" icon="i-logos-google-icon" icon-position="right" block>
          <p class="text-white text-md text-bold">Login with Google</p>
        </XBtn>
      </div>
    </div>
  </XModal>
</template>