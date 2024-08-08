export const useAppStore = defineStore('App', () => {
    const { $api, $get } = useApi()
    const app = reactive({
        name: 'ATP',
        version: '0.0.7',
        data: []
    }) as any


    async function start() {
        app.data.push(await $get('/api/app'))
    }

    return {
        app,
        start
    }
})

