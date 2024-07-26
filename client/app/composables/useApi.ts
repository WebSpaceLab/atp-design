export default function useApi() {
  // 

  return reactive({
    processing: false,
    flash: null as { message: string, style: string } | null,
    error: null as any,

    async fetch(path: string, method: string, options: any, hooks = {} as any) {
      // if (this.processing) return
      let { flash } = useToast()
      const _hooks = {
        onBefore: async () => {
          this.processing = true
          this.error = null
          this.flash = null

          if (hooks.start) await hooks.start()
        },

        onSuccess: async (res: any) => {
          this.flash = res.flash

          if (res.flash) flash(res.flash.message, res.flash.style)
          if (hooks.success) await hooks.success(res)

          return res.data
        },

        onError: async (error: any) => {
          this.error = error

          if (error.status !== 422) flash(error.message, 'error')

          if (hooks.error) await hooks.error(error)

          return error
        },

        onFinish: async () => {
          this.processing = false

          if (hooks.finish) await hooks.finish()
        }
      }

      await _hooks.onBefore()

      const { data, error, status, clear } = await useFetchApi(path, { method, ...options })

      if (error.value) return await _hooks.onError(error.value)

      if (status.value === 'success') return await _hooks.onSuccess(data.value)

      await _hooks.onFinish()

      clear()
    },

    async get(path: string, hooks = {}, options = { headers: {} }) {
      return await this.fetch(path, 'GET', options, hooks)
    },

    async post(path: string, body: any, hooks = {}, options = { headers: {} }) {
      return await this.fetch(path, 'POST', { body, ...options }, hooks)
    },

    async put(path: string, body: any, hooks = {}, options = { headers: {} }) {
      return await this.fetch(path, 'PUT', { body, ...options }, hooks)
    },

    async patch(path: string, body: any, hooks = {}, options = { headers: {} }) {
      return await this.fetch(path, 'PATCH', { body, ...options }, hooks)
    },

    async delete(path: string, hooks = {}, options = { headers: {} }) {
      return await this.fetch(path, 'DELETE', options, hooks)
    },
  })
}
