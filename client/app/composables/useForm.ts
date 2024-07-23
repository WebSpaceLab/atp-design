// @ts-nocheck
import cloneDeep from 'lodash.clonedeep'
import isEqual from 'lodash.isequal'

export default function useForm(data: any) {
  let defaults = data
  let recentlySuccessfulTimeoutId;

  const form = reactive({
    data: cloneDeep(data),
    errors: {},
    dirty: false,
    hasErrors: false,
    processing: false,
    wasSuccessful: false,
    recentlySuccessful: false,

    async submit(submitFn, hooks = {}) {
      if (this.processing) return

      const _hooks = {
        onBeffore: async () => {
          this.processing = true
          this.wasSuccessful = false
          this.recentlySuccessful = false

          clearTimeout(recentlySuccessfulTimeoutId)

          if (hooks.onBefore) await _hooks.onBefore()
        },
        onSuccess: async (response) => {
          this.clearErrors()
          this.wasSuccessful = true
          this.recentlySuccessful = true

          recentlySuccessfulTimeoutId = setTimeout(() => {
            this.recentlySuccessful = false
          }, 2000)

          if (hooks.onSuccess) await _hooks.onSuccess(response)

          defaults = cloneDeep(this.data)
        },
        onError: async (error) => {
          this.hasErrors = true
          if (error?.status === 422) {
            this.clearErrors()
            this.setErrors(error.data?.errors)
          }

          if (hooks.onError) await _hooks.onError(error)
        },
        omFinish: async () => {
          this.processing = false
          if (hooks.onFinish) await _hooks.onFinish()
        },
      }

      await _hooks.onBefore()

      try {
        const response = await submitFn(this.data)
        await _hooks.onSuccess(response)
      } catch (error) {
        await _hooks.onError(error)
      } finally {
        await _hooks.onFinish()
      }
    },

    reset(...data) {
      const clonedDefaults = cloneDeep(defaults)

      if (data.length === 0) {
        this.data = clonedDefaults
        return
      }

      data.forEach((key) => {
        if (clonedDefaults[key] !== undefined) this.data[key] = clonedDefaults[key]
      })
    },

    clearErrors(...data) {
      if (data.length === 0) {
        this.errors = {}
        this.hasErrors = false
        return
      }

      data.forEach((key) => {
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

  watch(() => form.data, () => {
    form.dirty = !isEqual(form.data, defaults)
  }, {
    immediate: true, deep: true
  })

  return form
}
