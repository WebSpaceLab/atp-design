export function useFetchApi(path: string, options: any = { headers: {} }) {
  const config = useRuntimeConfig()
  const token: string | any = useAuthStore().session.token

  let headers: any = {
    // accept: "application/ld+json",
    "Content-Type": "application/merge-patch+json",
    referer: config.public.appUrl,
  }

  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  }

  // if (import.meta.server) {
  //   headers = {
  //     ...headers,
  //     // ...useRequestHeaders(['cookie'])
  //   }
  // }

  return useFetch(path, {
    ...options,
    // baseURL: config.public.apiUrl,
    credentials: 'include',
    watch: false,
    headers: {
      ...headers,
      ...options?.headers
    }
  })
}
