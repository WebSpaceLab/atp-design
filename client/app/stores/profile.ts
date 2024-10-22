export const useProfileStore = defineStore('Profile', {
  state: () => {
    return {
      body: {
        avatarUrl: '',
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        bio: ''
      },
      loading: true
    }
  },
  actions: {
    async get() {
      this.loading = true

      await useApi().get(useAuthStore().session.iri).then((res: any) => {
        return this.updateBody(res.user)
      }).finally(() => {
        this.loading = false
      })
    },

    async update(form: any) {
      form.submit(useAuthStore().session.iri, 'PATCH', {
        success: (res: any) => {
          this.updateBody(res.data.user)
        }
      })
    },

    async updatePassword(form: any) {
      form.submit(`${useAuthStore().session.iri}/update-password`, 'PATCH', {
        success: () => {
          form.reset()
        }
      })
    },

    async avatarUrlUpdate(body: any, progress: any) {
      const res = await useUploader().upload(useAuthStore().session.iri + '/avatar-update', body, progress).then((res: any) => {
        return res.data.user
      }) as any

      this.updateBody(res)
      useAuthStore().init()
    },

    updateBody(user: any) {
      this.body.avatarUrl = user.avatarUrl
      this.body.username = user.username
      this.body.email = user.email
      this.body.firstName = user.firstName
      this.body.lastName = user.lastName
      this.body.bio = user.bio
    }
  }
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot))
// }
