<script setup lang="ts">
const { togleModalForgetPassword, togleModalForgetPasswordToRegister } = useForgotPasswordStore()
const { isShowForgotPassword } = storeToRefs(useForgotPasswordStore())
</script>

<template>
    <x-btn @click="togleModalForgetPassword(true)" color="primary" variant="link" label=" Do not you remember the password?" />

    <x-modal
        :show="isShowForgotPassword"
        max-width="2xl"
        :closeable="true"
        @close="togleModalForgetPassword"
    >   
        <div class="relative bg-background-light dark:bg-background-dark flex flex-col p-3 border-box space-y-10">
            <div class="absolute top-2 right-2">
                <XBtnCloseToOpen :switcher="isShowForgotPassword" @click="togleModalForgetPassword(false)" />
            </div>

            <div class="w-full box-border p-10">
                <x-form-auth-forgot-password />
            </div>

            <div class=" flex items-center justify-center  left-0 bottom-0 border-t-solid w-full">
                <span class="text-[14px] text-bold text-gray-600">
                    Don't have a kant?
                </span>
                
                <x-btn
                    @click="togleModalForgetPasswordToRegister()"
                    color="danger" 
                    variant="link"
                >
                    register 
                </x-btn>
            </div>
        </div>
    </x-modal>
</template>