import type { IAuthBody, IAuthResponse, IAuthSession } from '~~/types/auth'
import type { IForm, IFormResponse } from '~~/types/form'

export const useAuthStore = defineStore('Auth', {
  state: () => ({
    session: {
      iri: '',
      loggedIn: false,
      token: '',
      tokenExpiresAt: '',
      roles: [],
      user: {},
    } as IAuthSession,
  }),

  actions: {
    async login(form: IForm<IAuthBody>) {
      this.clearSession()

      form.submit('/api/auth/login', 'POST', {
        success: (res: IFormResponse) => {
          this.session.loggedIn = true

          if (res.data as IAuthResponse) {
            this.session.token = res.data.apiToken
            this.session.iri = res.data.Location
            this.session.tokenExpiresAt = res.data.apiTokenExpiresAt
          }

          useModalHelper().toggleLoginModal()
          form.reset()
          navigateTo('/dashboard')
        },
      }, {})
    },

    async init() {
      if (!this.session.loggedIn) return

      await useApi().get(this.session.iri, {
        Headers: {
          Authorization: `Bearer ${this.session.token}`,
        },
      }).then((res) => {
        this.session.user = Object.fromEntries(Object.entries(res.user).filter(([key]) => key !== 'roles'))
        this.session.roles = res.user.roles
      }).catch(() => {
        this.clearSession()
      })
    },

    async logout(message: string = '') {
      this.clearSession()

      await useApi().get('/api/auth/logout')

      if (message) useToast().flash(message, 'info')

      useModalHelper().showLoginModal()
    },

    async guard() {
      if (!this.session.loggedIn && !this.session.token) {
        this.logout('You are not authorized to access this page.')

        return navigateTo('/', {
          replace: true, redirectCode: 401,
        })
      }
    },

    clearSession() {
      this.session.loggedIn = false
      this.session.token = ''
      this.session.iri = ''
      this.session.tokenExpiresAt = ''
      this.session.roles = []
      this.session.user = {}
    },
  },
  persist: true,
})
