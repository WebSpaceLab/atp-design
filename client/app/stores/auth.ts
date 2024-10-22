export const useAuthStore = defineStore('Auth', {
  state: () => ({
    session: {
      iri: '',
      loggedIn: false,
      token: '',
      tokenExpiresAt: '',
      roles: [],
      user: {}
    },

    form: {
      loading: false,
      errors: [],
      body: {
        email: '',
        password: '',
      }
    }
  }),

  actions: {
    async login(body: any) {
      this.clearSession()

      await useApi().post('/api/auth/login', body).then((res: any) => {
        this.session.loggedIn = true
        this.session.token = res.apiToken
        this.session.iri = res.Location
        this.session.tokenExpiresAt = res.apiTokenExpiresAt
      }).finally(async () => {

        this.form.loading = false
        navigateTo('/dashboard')
      })
    },

    async init() {
      if (!this.session.loggedIn) return

      await useApi().get(this.session.iri, {
        Headers: {
          Authorization: `Bearer ${this.session.token}`
        }
      }).then((res: any) => {
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
          replace: true, redirectCode: 401
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
    }
  },
  persist: true
})

