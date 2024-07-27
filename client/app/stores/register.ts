export const useRegisterStore = defineStore('Register', () => {
    const isShowRegister = ref(false)

    // Register form
    const form = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        isAgree: false
    }) as any

    // Register the user
    const register = () => {
        form.submit('/api/auth/register', 'POST', {
            finish: () => {
                useRegisterStore().toggleRegister(false)
            }
        })
    }

    // Toggle the register modal
    function toggleRegister(event: boolean) {
        isShowRegister.value = event
        form.reset()
    }

    // Toggle the register modal to login modal
    function toggleModalRegisterToLogin() {
        useLoginStore().isShowLogin = computed(() => !useLoginStore().isShowLogin).value
        isShowRegister.value = computed(() => !isShowRegister.value).value
        form.reset()
        useLoginStore().form.reset()
    }

    return {
        form,
        register,
        isShowRegister,
        toggleRegister,
        toggleModalRegisterToLogin
    }
})
