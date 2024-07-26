// @ts-nocheck
import cloneDeep from 'lodash.clonedeep'
import isEqual from 'lodash.isequal'

export default function useForm(body: any) {
  let defaults = body
  let recentlySuccessfulTimeoutId;

  const form = reactive({
    body: cloneDeep(body),
    errors: {},
    dirty: false,
    hasErrors: false,
    processing: false,
    wasSuccessful: false,
    recentlySuccessful: false,

    async submit(path, method, hooks = {}, options) {
      if (this.processing) return

      let { flash } = useToast()

      const _hooks = {
        onBefore: async () => {
          this.processing = true
          this.wasSuccessful = false
          this.recentlySuccessful = false

          clearTimeout(recentlySuccessfulTimeoutId)

          if (hooks.onBefore) await hooks.onBefore()
        },

        onSuccess: async (res) => {
          this.clearErrors()
          this.wasSuccessful = true
          this.recentlySuccessful = true

          recentlySuccessfulTimeoutId = setTimeout(() => {
            this.recentlySuccessful = false
          }, 2000)

          if (res.flash) flash(res.flash.message, res.flash.style)
          if (hooks.onSuccess) await hooks.onSuccess(res)

          defaults = cloneDeep(this.body)
          this.reset()
        },

        onError: async (error) => {
          this.hasErrors = true
          if (error?.statusCode === 422) {
            this.clearErrors()
            this.setErrors(error.data?.errors)
          }

          if (error?.statusCode !== 422) flash(error.message, 'error')
          if (hooks.onError) await hooks.onError(error)
        },

        onFinish: async () => {
          this.processing = false
          if (hooks.onFinish) await hooks.onFinish()
        },
      }

      await _hooks.onBefore()

      try {
        const { data, error, status, clear } = await useFetchApi(path, {
          method,
          body: this.body,
          ...options,
        })
        if (status.value === 'error') await _hooks.onError(error.value)
        if (status.value === 'success') await _hooks.onSuccess(data.value)

        if (status.value === 'success') clear()
      } catch (error) {
        if (status.value === 'success') await _hooks.onSuccess(data.value)

      } finally {
        if (status.value !== 'pending') await _hooks.onFinish()
      }
    },

    reset(...body) {
      const clonedDefaults = cloneDeep(defaults)

      if (body.length === 0) {
        this.body = clonedDefaults
        return
      }

      body.forEach((key) => {
        if (clonedDefaults[key] !== undefined) this.body[key] = clonedDefaults[key]
      })
    },

    clearErrors(...body) {
      if (body.length === 0) {
        this.errors = {}
        this.hasErrors = false
        return
      }

      body.forEach((key) => {
        delete this.errors[key]
      })

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
