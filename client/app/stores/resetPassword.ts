export const useResetPasswordStore = defineStore('ResetPassword', () => {
  let { $post } = useApi()
  const form = reactive({
    errors: null,
    processing: false,
    body: {
      email: '',
      password: '',
      password_confirmation: ''
    }
  }) as any

  const resetPassword = async (body: any) => {
    await $post('/api/reset-password', body)
  }

  return {
    form,
    resetPassword
  }
})
