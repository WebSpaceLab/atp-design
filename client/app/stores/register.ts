import type { IForm } from '~~/types/form'
import type { IRegisterBody } from '~~/types/register'

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
      } as IRegisterBody,
    },
  }),

  actions: {
    async register(form: IForm<IRegisterBody>) {
      this.form.loading = true

      form.submit('/api/auth/register', 'POST', {
        success: () => {
          useModalHelper().toggleRegisterModal()
          form.reset()
        },
      }, {})
      // await useApi().post('/api/auth/register', body).catch((err) => {
      //   console.log('Register ERR', err)
      //   this.form.errors = err.response.data.errors
      // }).finally(() => {
      //   this.clearForm()
      //   useModalHelper().showLoginModal()
      // })
    },

    clearForm() {
      this.form.body = {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
      }

      this.form.loading = false
      this.form.errors = []
    },
  },
})
