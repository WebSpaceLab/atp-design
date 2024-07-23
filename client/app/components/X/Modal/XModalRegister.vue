<script lang="ts" setup>

</script>

<template>
  <XModal :show="$auth.modal.isShowRegister" :closeable="true" :overflow-hidden="false"
    @close="(event) => $auth.toggleRegisterModal(event)">
    <div class="w-120  relative flex flex-col justify-center pt-12 px-8 pb-6">
      <div class="absolute top-3 right-4">
        <XBtnCloseToOpen :switcher="$auth.modal.isShowRegister" @click="$auth.closeRegisterModal()" />
      </div>

      <div class="text-center pb-8">
        <Icon name="i-line-md-person-add-filled" class="text-7xl text-center text-primary" />
        <h2 class="text-center text-3xl font-semibold">Register</h2>

        <div class="flex justify-center items-center">

          <p>You already have an account?</p>

          <XBtn variant="link" label="Log in" @click="$auth.toggleRegisterToLogin()" />
        </div>
      </div>
      <!--
      
        <div v-if="useRegisterStore().error" class="mb-6">
          <UAlert color="red" variant="solid" :title="useRegisterStore().error?.statusMessage">
            <template #icon>
              <Icon name="i-game-icons-unlit-bomb" class="text-red-900 text-2xl" />
            </template>
</UAlert>
</div>
<XFormRegister />
-->

    </div>
  </XModal>
</template>