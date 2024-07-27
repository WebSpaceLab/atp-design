export function useFetchApi(path: string, options: any = { headers: {} }) {
  const config = useRuntimeConfig()
  const token: string | any = useCookie('Api-Token')

  let headers: any = {
    accept: "application/json",
    "Content-Type": "application/json",
    referer: config.public.appUrl,
  }

  if (token && token.value !== null) {
    headers['Authorization'] = 'Bearer ' + token
  }

  if (import.meta.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(['cookie'])
    }
  }

  return useFetch(path, {
    ...options,
    baseURL: config.public.apiUrl,
    credentials: 'include',
    watch: false,
    inmitli: false,
    // server: true,
    headers: {
      ...headers,
      ...options?.headers
    }
  })
}
