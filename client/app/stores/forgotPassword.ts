export const useForgotPasswordStore = defineStore('ForgotPassword', {
  state: () => {
    return {
      body: {
        email: ''
      },
      loading: false
    }
  },

  actions: {
    async submit(form: any) {
      form.submit('/api/forgot-password', 'POST', {
        success: () => {
          form.reset()
        }
      })
    }
  }
})
