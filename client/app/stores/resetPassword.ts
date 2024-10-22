export const useResetPasswordStore = defineStore('ResetPassword', {
  state: () => ({
    form: {
      errors: null,
      processing: false,
      body: {
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  }),

  actions: {
    async resetPassword(body: any) {
      this.form.processing = true
      try {
        await useApi().post('/api/reset-password', body)
      } catch (err: any) {
        this.form.errors = err.response.data.errors
      } finally {
        this.form.processing = false
      }
    }
  }
})
