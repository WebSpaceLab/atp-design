<script setup lang="ts">
const emit = defineEmits(['toggleModalRegisterToLogin'])

const isShow = ref(false)

const close = (event: boolean) => {
    isShow.value = event
}

const toggleModalRegisterToLogin = (event: boolean) => {
    isShow.value = !isShow.value
    emit('toggleModalRegisterToLogin', event)
}
</script>

<template>
    <x-btn @click="close" color="primary" variant="link" label=" Do not you remember the password?" />

    <x-modal
        :show="isShow"
        max-width="2xl"
        :closeable="true"
        @close="close"
    >   
        <div class="relative bg-background-light dark:bg-background-dark flex flex-col p-3 border-box space-y-10">
            <div class="absolute top-2 right-2">
                <XBtnCloseToOpen :switcher="isShow" @click="close(false)" />
            </div>

            <div class="w-full box-border p-10">
                <x-form-auth-forgot-password :show="isShow" />
            </div>

            <div v-if="!$auth.response" class=" flex items-center justify-center  left-0 bottom-0 border-t-solid w-full">
                <span class="text-[14px] text-bold text-gray-600">
                    Don't have a kant?
                </span>
                
                <x-btn
                    @click="toggleModalRegisterToLogin(true)"
                    color="danger" 
                    variant="link"
                >
                    register 
                </x-btn>
            </div>
        </div>
    </x-modal>
</template>