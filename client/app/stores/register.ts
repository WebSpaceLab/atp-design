export const useRegisterStore = defineStore('Register', {
  state: () => ({
    form: {
      loading: false,
      errors: [],
      body: {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  }),

  actions: {
    async register(body: any) {
      this.form.loading = true
      await useApi().post('/api/auth/register', body).then(() => {
        navigateTo('/login')
      }).catch((err: any) => {
        this.form.errors = err.response.data.errors
      }).finally(() => {
        this.form.loading = false
      })
    }
  }
})
