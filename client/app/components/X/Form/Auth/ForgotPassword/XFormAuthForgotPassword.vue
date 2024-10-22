<script setup lang="ts">
const { submit } = useForgotPasswordStore()

const form = useForm({
    email: ''
})
</script>

<template>
    <div>
        <form class="relative flex flex-col w-100 h-full" @submit.prevent="submit(form)">
            <span class="w-full h-full text-basic-light dark:text-basic-dark flex flex-col justify-center items-center">
    
                <div class="text-2xl md:text-3xl mb-4 font-bold">Do not you remember the password?</div>
            </span>
    
            <div class="pt-5 space-y-6">
                <x-input
                    v-model="form.body.email"
                    :color="form.errors && form.errors?.email ? 'error' : 'default'"
                    label="Email"
                    type="email"
                    icon="material-symbols:mark-email-unread-sharp"
                    name="email_forgot_password"
                    :error="form.errors && form.errors?.email ? form.errors.email : ''"
                >
                    <template #icon>
                        <Icon name="material-symbols:mark-email-unread-sharp" class="text-xl" />
                    </template>
                </x-input>
        
                <div class="w-full space-y-6">
                    <x-btn
                        :disabled="(!form.body.email)"
                        type="submit"
                        color="success"
                        :loading="form.loading"
                        shadow
                        block
                    >
                       Save
                    </x-btn>
                </div>
            </div>
        </form>
    </div>
</template>