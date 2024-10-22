export default function useApi() {
  return reactive({
    loading: false as boolean,
    errors: null as any,

    clearErrors() {
      this.errors = null
    },

    setErrors(error: any) {
      this.errors = error
    },

    async api(path: string, method: string, options: any, hooks = {} as any) {
      if (this.loading) return

      let { flash } = useToast()
      let headers: any = {
        accept: "application/ld+json",
        "Content-Type": "application/json",
      }

      const _hooks = {
        onBefore: async () => {
          this.loading = true
          this.clearErrors()

          if (hooks.start) await hooks.start()
        },

        onSuccess: async (res: any) => {
          if (res.flash) flash(res.flash.message, res.flash.style)
          if (res.refresh) location.reload()
          if (hooks.success) await hooks.success(res)
          if (res.redirect) navigateTo(res.redirect)

          return res.data
        },

        onError: async (error: any) => {
          if (error?.statusCode !== 422 && error?.statusCode !== 401) flash(error.data?.title, 'error')

          if (error?.statusCode === 401) {
            console.log('Unauthorized')
            useAuthStore().guard()
          }

          if (hooks.error) await hooks.error(error)

          if (error?.statusCode === 422) {
            this.setErrors(error.data?.errors)
          }

          return error
        },

        onFinish: async () => {
          this.loading = false

          if (hooks.finish) await hooks.finish()
        }
      }

      if (useAuthStore().session.token) headers['Authorization'] = `Bearer ${useAuthStore().session.token}`

      await _hooks.onBefore()

      return await $fetch(path, {
        method,
        ...options,
        headers: {
          ...headers,
          ...options?.headers
        }
      })
        .then(async (res: any) => {
          return await _hooks.onSuccess(res)
        })
        .catch(async (error: any) => {
          return await _hooks.onError(error)
        })
        .finally(async () => {
          return await _hooks.onFinish()
        })
    },

    async get(path: string, options = {} as any, hooks = {} as any) {
      return await this.api(path, 'GET', options, hooks)
    },

    async post(path: string, body: any, options = {} as any, hooks = {} as any) {
      return await this.api(path, 'POST', { body, ...options }, hooks)
    },

    async put(path: string, body: any, options = {} as any, hooks = {} as any) {
      return await this.api(path, 'PUT', { body, ...options }, hooks)
    },

    async patch(path: string, body: any, options = {} as any, hooks = {} as any) {
      return await this.api(path, 'PATCH', { body, ...options }, hooks)
    },

    async remove(path: string, options = {} as any, hooks = {} as any) {
      return await this.api(path, 'DELETE', options, hooks)
    }
  })
}
