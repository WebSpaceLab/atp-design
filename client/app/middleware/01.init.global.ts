
export default defineNuxtRouteMiddleware(async (to, from) => {
    const { session } = useAuthStore()

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;

    if (to.query.verified) {
        useModalHelper().showLoginModal()
        // $auth.response = {
        //     status: 'Registration was successful. You can log in now.'
        // }
    }

    if (!import.meta.server) {
        if (session.loggedIn) {
            if (session.tokenExpiresAt > dateTime) {
                if (!session.token) {
                    useAuthStore().logout('Please login.')
                } else {
                    await useAuthStore().init()
                    console.log('session.loggedIn', session.loggedIn)
                    console.log('session.tokenExpiresAt', session.tokenExpiresAt)
                }
            } else {
                useAuthStore().logout('Your session has expired. Please log in again.')
            }
        }
    }
})