export const useForgotPasswordStore = defineStore('ForgotPassword', () => {
  const isShowForgotPassword = ref(false)

  const form = useForm({
    email: '',
  }) as any

  const forgotPassword = () => {
    form.submit('/api/auth/forgot-password', 'POST', {
      finish: () => {
        useForgotPasswordStore().togleModalForgetPassword(false)
      }
    })
  }

  const togleModalForgetPassword = (event: boolean) => {
    isShowForgotPassword.value = event
    useLoginStore().toggleLogin(false)
    form.reset()
  }

  const togleModalForgetPasswordToRegister = () => {
    useRegisterStore().isShowRegister = computed(() => !useRegisterStore().isShowRegister).value
    isShowForgotPassword.value = computed(() => !isShowForgotPassword.value).value
    useRegisterStore().form.reset()
  }

  return {
    form,
    forgotPassword,
    isShowForgotPassword,
    togleModalForgetPassword,
    togleModalForgetPasswordToRegister
  }
})
