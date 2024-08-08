export const useForgotPasswordStore = defineStore('ForgotPassword', () => {
  const form = reactive({
    errors: null,
    processing: false,
    body: {
      email: ''
    }
  }) as any

  const forgotPassword = async () => {
  }
  return {
    form,
    forgotPassword
  }
})
