

export const useRegisterStore = defineStore('Register', () => {
  const { $post, loading, errors } = useApi()

  const form = reactive({
    loading: false,
    errors: [],
    body: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
    }
  }) as any

  // Register the user
  const register = async (body: any) => {
    await $post('/api/auth/register', body)
  }

  watch(loading.value, (value) => {
    form.loading = value
  })

  watch(errors, async (value) => {
    // console.log('errors', value)
    form.errors = await value
  })

  return {
    form,
    register
  }
})
