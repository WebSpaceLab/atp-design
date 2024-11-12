<script lang="ts" setup>
const { isShowLoginModal, toggleLoginModal, toggleRegisterModal } = useModalHelper()
</script>

<template>
  <div>
    <XTooltip text="Login">
      <XBtn
        variant="ghost"
        color="primary"
        icon="i-line-md-person-filled"
        square
        @click="toggleLoginModal"
      />
    </XTooltip>

    <XModal
      max-width="md"
      :show="isShowLoginModal"
      :closeable="true"
      @close="toggleLoginModal"
    >
      <div class="w-120 relative flex flex-col justify-center pt-16 px-8 pb-8">
        <div class="absolute top-2 right-2">
          <XBtnCloseToOpen
            :switcher="isShowLoginModal"
            @click="toggleLoginModal"
          />
        </div>

        <div class="text-center pb-8">
          <!-- @vue-ignore -->
          <Icon
            name="i-line-md-person-filled"
            class="text-7xl text-center text-primary"
          />

          <h2 class="text-primary-900 dark:text-primary-100 text-center text-3xl font-semibold">
            Welcome back!
          </h2>

          <div class="text-basic-900 dark:text-basic-400 flex justify-center items-center">
            <p>Don't have an account?</p>
            <XBtn
              variant="link"
              label="Sign Up"
              @click="toggleRegisterModal"
            />
          </div>
        </div>

        <XFormAuthLogin />

        <XDivider
          label="OR"
          class="py-4"
        />

        <div class="space-y-4 flex flex-col justify-center">
          <XBtn
            color="red"
            icon="i-logos-google-icon"
            icon-position="right"
            block
            shadow
          >
            <p class="text-white text-md text-bold">
              Login with Google
            </p>
          </XBtn>
        </div>
      </div>
    </XModal>
  </div>
</template>
