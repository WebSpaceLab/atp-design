export default defineNuxtRouteMiddleware(async (to, from) => {
    const { session } = useAuthStore()

    const dateTime = new Date().toISOString();

    if (to.query.verified) {
        useModalHelper().showLoginModal()
    }

    if (!import.meta.server) {
        if (session.loggedIn) {
            if (session.tokenExpiresAt > dateTime) {
                if (!session.token) {
                    useAuthStore().logout('Please login.')
                } else {
                    await useAuthStore().init()
                }
            } else {
                useAuthStore().logout('Your session has expired. Please log in again.')
                console.log('session.tokenExpiresAt', session.tokenExpiresAt)
                console.log('dateTime', dateTime)
            }
        }
    }
})