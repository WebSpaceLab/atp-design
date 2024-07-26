<script setup>
const props = defineProps({
    show: {
        type: Boolean,
    }
})

const form = useForm({
    email: ''
})

watch(() => props.show, (value) => {
    if (value === false) {
        form.reset()
    }
})
</script>

<template>
    <div>
        <form v-if="!$auth.response" class="relative flex flex-col w-100 h-full" @submit.prevent="$auth.forgotPassword(form)">
            <span class="w-full h-full text-basic-light dark:text-basic-dark flex flex-col justify-center items-center">
    
                <div class="text-2xl md:text-3xl mb-4 font-bold">Do not you remember the password?</div>
            </span>
    
            <transition
                enter-active-class="transition ease-in duration-500"
                enter-from-class="transform opacity-0"
                enter-to-class="transform opacity-100"
                leave-active-class="transition ease-in duration-300"
                leave-from-class="transform opacity-0"
                leave-to-class="transform opacity-100"
            >
                <span v-if="$auth.errors && $auth.errors.status" class="w-full p-4 box-border text-center text-bold bg-error-300 text-error-900 rounded-lg transition ease-in duration-500">
                    {{ $auth.errors.status }}
                </span>
            </transition>
    
            <div class="pt-5 space-y-6">
                <x-input
                    v-model="form.body.email"
                    :color="$auth.errors && $auth.errors?.email ? 'error' : 'default'"
                    label="Email"
                    type="email"
                    icon
                    name="email_forgot_password"
                    :error="$auth.errors && $auth.errors?.email ? $auth.errors.email : ''"
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
                        :loading="$auth.processing?.forgotPassword"
                        shadow
                        block
                    >
                       Save
                    </x-btn>
                </div>
            </div>
        </form>

        <div v-else class="px-10 py-20 text-xl text-bold text-info-900 bg-info-300 rounded-xl shadow-2xl shadow-black transition-all duration-500">
            {{ $auth.response?.message }}
        </div>
    </div>
</template>