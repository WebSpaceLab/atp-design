export function useFetchApi(path: string, options: any = { headers: {} }) {
  const config = useRuntimeConfig()
  const token: string | string | null = useAuthStore().session.token

  const headers: Record<string, string> = {
    // accept: "application/ld+json",
    'Content-Type': 'application/json',
    'referer': config.public.appUrl,
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
      ...options?.headers,
    },
  })
}
