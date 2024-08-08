export const useProfileStore = defineStore('Profile', () => {
  const { $get, $patch, errors, loading } = useApi()
  // const { session, user } = useUserSession()

  const form = reactive({
    loading: false,
    errors: [],
    body: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      bio: '',
    }
  })

  const user = ref({})

  async function me(iri: string) {
    user.value = await $get(iri).then((res) => {
      return res.user
    })

    updateUserToForm(user.value)
  }

  const update = async (iri: string, body: any) => {
    user.value = await $patch(iri, body).then((res) => {
      console.log('res', res)
      return res.user
    })

    updateUserToForm(user.value)
  }

  const updatePassword = async (iri: string, form: any) => {
    form.submit(`${iri}/update-password`, 'PATCH', {
      success: () => {
        form.reset()
      }
    })
  }

  const updateUserToForm = (user: any) => {
    form.body.username = user.username
    form.body.email = user.email
    form.body.firstName = user.firstName
    form.body.lastName = user.lastName
    form.body.bio = user.bio
  }

  watch(loading.value, (value) => {
    form.loading = value
  })

  watch(errors, async (value) => {
    // console.log('errors', value)
    form.errors = await value
  })

  return {
    me,
    form,
    user,
    update,
    updatePassword
  }
})
