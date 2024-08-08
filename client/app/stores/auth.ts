export const useAuthStore = defineStore('Auth', () => {
  const { $post, loading, errors } = useApi()
  const { fetch } = useUserSession()

  const form = reactive({
    loading: false,
    errors: [],
    body: {
      email: '',
      password: '',
    }
  })

  const login = async (body: any) => {
    await $post('/api/auth/login', body, {
      success: async (res: any) => {
        await fetch()
      }
    })
  }

  watch(loading.value, (value) => {
    form.loading = value
  })

  watch(errors.value, (value) => {
    form.errors = value
  })

  return {
    form,
    login,
  }
})

