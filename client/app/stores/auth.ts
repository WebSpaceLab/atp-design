const api = useApi()

export const useAuthStore = defineStore('Auth', {
    state: () => {
        return {
            errors: null as any,
            processing: {
                login: false,
                register: false,
                logout: false,
                response: false,
                forgotPassword: false,
            },
            user: null as any,
            response: null as any
        }
    },

    actions: {
        async login() {

        }
    }
})
