export default function useApi() {
  let loading = useState('loading', () => false) as any
  let errors = useState('errors', () => [] as any)
  let data = useState('data', () => [] as any)

  let { flash } = useToast()
  let token: string | any = useCookie('Api-Token')

  let headers: any = {
    "Content-Type": "application/json",
  }

  if (token.value) {
    headers['Authorization'] = 'Bearer ' + token.value
  }

  async function $api(path: string, method: string, options: any, hooks = {} as any) {
    if (loading.value) return

    const _hooks = {
      onBefore: async () => {
        loading.value = true
        clearErrors()

        if (hooks.start) await hooks.start()
      },

      onSuccess: async (res: any) => {
        if (res.flash) flash(res.flash.message, res.flash.style)
        if (res.refresh) location.reload()
        if (hooks.success) await hooks.success(res)
        if (res.redirect) location.href = res.redirect

        data.value.push(res.data)

        return res.data
      },

      onError: async (error: any) => {
        if (error?.statusCode !== 422 && error?.statusCode !== 401) flash(error.data.title, 'error')
        if (error?.statusCode === 401) flash('Unauthorized', 'error')

        if (hooks.error) await hooks.error(error)

        if (error?.statusCode === 422) {
          setErrors(error.data?.errors)
        }

        return error
      },

      onFinish: async () => {
        loading.value = false

        if (hooks.finish) await hooks.finish()
      }
    }

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
  }



  const $get = async (path: string, hooks = {}, options = { headers: {} }) => {
    return await $api(path, 'GET', options, hooks)
  }

  const $post = async (path: string, body: any, hooks = {}, options = { headers: {} }) => {
    return await $api(path, 'POST', { body, ...options }, hooks)
  }

  const $put = async (path: string, body: any, hooks = {}, options = { headers: {} }) => {
    return await $api(path, 'PUT', { body, ...options }, hooks)
  }

  const $patch = async (path: string, body: any, hooks = {}, options = { headers: {} }) => {
    return await $api(path, 'PATCH', { body, ...options }, hooks)
  }

  const $remove = async (path: string, hooks = {}, options = { headers: {} }) => {
    return await $api(path, 'DELETE', options, hooks)
  }

  function clearErrors() {
    errors.value = []
  }

  function setErrors(error: any) {
    errors.value = error
  }

  return { $api, $get, $post, $put, $patch, $remove, loading, errors, data }
}
