export default defineNuxtRouteMiddleware(async () => {
    return useAuthStore().guard()
})