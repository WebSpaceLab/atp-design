import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const url = useRuntimeConfig().proxyUrl
  const path = event.path
  const target = joinURL(url, path)
  const body = await readBody(event)

  try {
    const res = await $fetch(target, {
      method: event.method,
      headers: event.headers,
      body: body
    }) as any

    if (res.data.apiToken) setCookie(event, 'Api-Token', res.data.apiToken)

    console.log('res.data', res.data)

    await setUserSession(event, {
      user: {
        username: res.data.user.username,
        email: res.data.user.email,
        avatarUrl: res.data.user.avatarUrl,
        iri: res.data.user.iri,
      },
      loggedInAt: new Date(),
      roles: res.data.user.roles,
      tokenExpiresAt: res.data.user.apiTokenExpiresAt,
    })

    return {
      redirect: '/dashboard',
      refresh: false,
      flash: res.flash,
    }
  } catch (error) {
    return error
  }
})