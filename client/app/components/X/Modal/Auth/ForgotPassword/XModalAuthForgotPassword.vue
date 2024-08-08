<script setup lang="ts">
const {isShowForgotPasswordModal, toggleForgotPasswordModal, toggleRegisterModal } = useModalHelper()
</script>

<template>
    <x-btn @click="toggleForgotPasswordModal" color="primary" variant="link" label=" Do not you remember the password?" />

    <x-modal
        :show="isShowForgotPasswordModal"
        max-width="2xl"
        :closeable="true"
        @close="toggleForgotPasswordModal"
    >   
        <div class="relative bg-background-light dark:bg-background-dark flex flex-col p-3 border-box space-y-10">
            <div class="absolute top-2 right-2">
                <XBtnCloseToOpen :switcher="isShowForgotPasswordModal" @click="toggleForgotPasswordModal" />
            </div>

            <div class="w-full box-border p-10">
                <x-form-auth-forgot-password />
            </div>

            <div class=" flex items-center justify-center  left-0 bottom-0 border-t-solid w-full">
                <span class="text-[14px] text-bold text-gray-600">
                    Don't have a kant?
                </span>
                
                <x-btn
                    @click="toggleRegisterModal"
                    color="danger" 
                    variant="link"
                >
                    register 
                </x-btn>
            </div>
        </div>
    </x-modal>
</template>