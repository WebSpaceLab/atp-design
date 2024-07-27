export const useLoginStore = defineStore('Login', () => {
  const isShowLogin = ref(false)

  // Login form
  const form = useForm({
    email: '',
    password: '',
  }) as any

  // Login the user
  const login = () => {
    form.submit('/api/auth/login', 'POST', {
      finish: () => {
        useLoginStore().toggleLogin(false)
      }
    })
  }

  // Toggle the login modal
  function toggleLogin(event: boolean) {
    isShowLogin.value = event
    form.reset()
  }

  // Toggle the login modal to register modal
  function toggleModalLoginToRegister() {
    useRegisterStore().isShowRegister = computed(() => !useRegisterStore().isShowRegister).value
    isShowLogin.value = computed(() => !isShowLogin.value).value
    form.reset()
    useRegisterStore().form.reset()
  }

  return {
    form,
    login,
    isShowLogin,
    toggleLogin,
    toggleModalLoginToRegister
  }
})
