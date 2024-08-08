import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const url = useRuntimeConfig().proxyUrl
  const path = event.path
  const target = joinURL(url, path)

  return proxyRequest(event, target)
})
