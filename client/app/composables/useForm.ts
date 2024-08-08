// @ts-nocheck

import cloneDeep from 'lodash.clonedeep'
import isEqual from 'lodash.isequal'

export default function useForm(body) {
  let defaults = body
  let recentlySuccessfulTimeoutId;
  let { flash } = useToast()

  const form = reactive({
    body: cloneDeep(body),
    errors: {} as any,
    dirty: false as boolean,
    hasErrors: false as boolean,
    loading: false as boolean,
    wasSuccessful: false as boolean,
    recentlySuccessful: false as boolean,

    async submit(path, method = 'POST', hooks = {}, options = {}) {
      if (this.loading) return

      const _hooks = {
        onBefore: async () => {
          // this.loading = true
          this.wasSuccessful = false
          this.recentlySuccessful = false

          clearTimeout(recentlySuccessfulTimeoutId)

          if (hooks.start) await hooks.start()
        },

        onSuccess: async (res: any) => {
          this.clearErrors()
          this.wasSuccessful = true
          this.recentlySuccessful = true

          recentlySuccessfulTimeoutId = setTimeout(() => {
            this.recentlySuccessful = false
          }, 2000)

          if (hooks.success) await hooks.success(res)

          defaults = cloneDeep(this.body)
          if (res.flash) flash(res.flash.message, res.flash.style)
          if (res.refresh) location.reload()
          if (res.redirect) location.href = res.redirect

          return res.data
        },

        onError: async (error: any) => {
          this.hasErrors = true

          if (error?.statusCode !== 422 && error?.statusCode !== 401) flash(error.data.title, 'error')
          if (error?.statusCode === 401) flash('Unauthorized', 'error')
          if (error?.statusCode === 422) {
            this.clearErrors()
            this.setErrors(error.data?.errors)
          }

          if (hooks.error) await hooks.error(error)

          return error
        },

        onFinish: async () => {
          this.loading = false
          if (hooks.finish) await hooks.finish()
        },
      }

      await _hooks.onBefore()

      return await useFetchApi(path, {
        method,
        body: this.body
      }).then(async (res: any) => {
        if (res.status.value === 'success') return await _hooks.onSuccess(res.data.value)
        if (res.status.value === 'error') return await _hooks.onError(res.error.value)
      }).catch(async (error: any) => {
        return await _hooks.onError(error.value)
      }).finally(async () => {
        await _hooks.onFinish()
      })
    },

    reset(...body) {
      const clonedDefaults = cloneDeep(defaults)

      if (body.length === 0) {
        this.body = clonedDefaults
      } else {
        body.forEach((key) => {
          if (clonedDefaults[key] !== undefined) this.body[key] = clonedDefaults[key]
        })
      }
    },

    clearErrors(...body) {
      if (body.length === 0) {
        this.errors = {}
        this.hasErrors = false

      } else {
        body.forEach((key: number) => delete this.errors[key])
      }

      this.hasErrors = Object.keys(this.errors).length > 0
    },

    setErrors(errors) {
      this.errors = {
        ...this.errors,
        ...errors
      }

      this.hasErrors = Object.keys(this.errors).length > 0
    },
  });

  watch(() => form.body, () => {
    form.dirty = !isEqual(form.body, defaults)
  }, {
    immediate: true, deep: true
  })

  return form
}
