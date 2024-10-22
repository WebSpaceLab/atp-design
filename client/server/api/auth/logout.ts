import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const url = useRuntimeConfig().proxyUrl
  const path = event.path
  const target = joinURL(url, path)

  setCookie(event, 'Api-Token', '')
  setCookie(event, 'iri', '')
  setCookie(event, 'loggedIn', '')

  try {
    await $fetch(target, {
      headers: event.headers,
    }) as any
  } catch (error) {
    return error
  } finally {
    return {
      redirect: '/',
      refresh: false,
      flash: {
        style: 'success',
        message: 'You have been logged out',
      },
    }
  }
})
