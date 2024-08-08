
export default defineNuxtRouteMiddleware(async (to, from) => {
    const { toggleLoginModal } = useModalHelper()
    const { loggedIn, session, clear } = useUserSession()

    const today = new Date();
    // const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // const dateTime = date + ' ' + time;

    if (to.query.verified) {
        toggleLoginModal()
        // $auth.response = {
        //     status: 'Rejestracja przeszła pomyślnie. Możesz się teraz zalogować.'
        // }
    }

    if (!import.meta.server) {
        if (session.value.tokenExpiresAt < today) {
            // const { flash } = useToast()
            const { $get } = useApi()
            console.log('token expired')
            clear()
            $get('/api/auth/logout')
            // flash
        }
        // TODO - jeżeli jest error 401 to wyloguj
        // if ($auth.token === null) {
        //     $auth.logout()
        // }
    }
})