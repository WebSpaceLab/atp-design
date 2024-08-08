export default defineNuxtRouteMiddleware(async () => {
    const { loggedIn } = useUserSession()
    const token: string | any = useCookie('Api-Token')

    function guard() {
     
    }

    if (!token.value && !loggedIn.value) {
       return  navigateTo('/', { replace: true })
    }
})