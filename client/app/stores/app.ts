interface AppState {
    data: any
    processing: boolean
}

const api = useApi()

export const useAppStore = defineStore('App', {
    state: (): AppState => {
        return {
            data: null as any,
            processing: false
        }
    },

    actions: {
        async start() {

            this.data = await api.get('/api/app')

        }
    }
})

