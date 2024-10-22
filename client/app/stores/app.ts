export const useAppStore = defineStore('App', {
  state: () => {
    return {
      name: 'ATP',
      version: '0.0.7',
      data: [],

    }
  },

  actions: {
    async start() {
      this.data = await useApi().get('/api/app')
    }
  }
})

