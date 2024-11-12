import type { Activity, Notification } from '~~/types/dashboard'

export const useDashboardStore = defineStore('Dashboard', {
  state: () => {
    return {
      info: {
        user: {},
        users: {
          total: 0,
          newSignUps: 0,
          userGrowth: null,
        },
        content: {
          pages: 50,
          articles: 120,
          media: 500,
        },

        comments: {
          total: 3500,
          pending: 15,
        },
        visits: {
          today: 1500,
          weeklyData: [1200, 1500, 1800, 1600, 2000, 1800, 1500],
        },

        recentActivities: [
          { id: 1, description: 'Nowy artykuł: "10 wskazówek SEO"', time: '2 godziny temu' },
          { id: 2, description: 'Zaktualizowano stronę główną', time: '4 godziny temu' },
          { id: 3, description: 'Nowy komentarz do moderacji', time: '5 godzin temu' },
          { id: 4, description: 'Dodano 5 nowych zdjęć', time: 'wczoraj' },
          { id: 5, description: 'Opublikowano nową stronę "O nas"', time: '2 dni temu' },
        ] as Activity[],

        systemNotifications: [
          { id: 1, type: 'warning', message: 'Aktualizacja systemu dostępna' },
          { id: 2, type: 'info', message: 'Nowa wersja motywu jest gotowa do instalacji' },
          { id: 3, type: 'error', message: 'Błąd podczas tworzenia kopii zapasowej' },
        ] as Notification[],
      },
      isLoading: true, // This is a boolean that will be used to show a loading spinner
    }
  },

  actions: {
    async get() {
      await useApi().get('/api/dashboard').then((res) => {
        this.info.user = res.user
        this.info.users = res.users
        // this.info.users.total = res.users.total
        // this.info.users.newSignUps = res.users.newSignUps
      }).finally(() => {
        this.isLoading = false
      })
    },
  },
})
