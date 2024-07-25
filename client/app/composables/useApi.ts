export default function useApi() {
  return reactive({
    status: '' as string,
    errorBag: null,
    processing: false,
    async get(path: string, options = { headers: {} }) {
      return await useFetchApi(path, options).then((response) => {
        if (response.error.value) {
          return response.error.value
        }

        this.status = response.status.value
        this.processing = response.pending.value
        return response.data.value
      })
    },

    async post(path: string, options = { headers: {} }) {
      return await useFetchApi(path, { method: 'POST', ...options }).then((response) => {
        if (response.error.value) {
          if (response.error.value.statusCode === 422) {
            this.errorBag = response.error.value.data.errors
          }

          return response.error.value
        }

        this.status = response.status.value
        this.processing = response.pending.value
        return response.data.value
      })
    },

    async put(path: string, options = { headers: {} }) {
      return await useFetchApi(path, { method: 'PUT', ...options }).then((response) => {
        if (response.error.value) {
          if (response.error.value.statusCode === 422) {
            this.errorBag = response.error.value.data.errors
          }

          return response.error.value
        }

        this.status = response.status.value
        this.processing = response.pending.value

        return response.data.value
      })
    },

    async patch(path: string, options = { headers: {} }) {
      return await useFetchApi(path, { method: 'PATCH', ...options }).then((response) => {
        if (response.error.value) {
          if (response.error.value.statusCode === 422) {
            this.errorBag = response.error.value.data.errors
          }

          return response.error.value
        }

        this.status = response.status.value
        this.processing = response.pending.value

        return response.data.value
      })
    },

    async delete(path: string) {
      return await useFetchApi(path, { method: 'DELETE' }).then((response) => {
        if (response.error.value) {
          return response.error.value
        }

        this.status = response.status.value
        this.processing = response.pending.value

        return response.data.value
      })
    },

    async clear() {
      this.errorBag = null
      this.status = ''
      this.processing = false
    },

    async csrf() {
      return await useFetchApi('/sanctum/csrf-cookie')
    }
  })
}
