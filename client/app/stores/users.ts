export const useUsersStore = defineStore('Users', {
  state: () => ({
    users: [] as any[],

    pagination: {
      total: null,
      current_page: null,
      per_page: null,
      first_page: 1,
    },

    months: [],
    queryParams: {
      column: '',
      term: '',
      month: '',
      orderBy: '',
      orderDir: '',
      page: 1,
      per_page: 8
    },
    isLoading: true,
  }),

  actions: {
    async get(query: any) {
      await useApi().get(`/api/users`, {
        params: {
          column: query.column,
          term: query.term,
          month: query.month,
          orderBy: query.orderBy,
          orderDir: query.orderDir,
          per_page: query.per_page,
          page: query.page
        }
      }).then((res: any) => {
        this.users = res.users
        this.pagination.total = res.pagination.total
        this.pagination.current_page = res.pagination.current_page
        this.pagination.per_page = res.pagination.per_page
        this.months = res.months
        this.queryParams = res.queryParams
      }).catch((err: any) => {
        console.error(err)
      }).finally(() => {
        this.isLoading = false
      })
    },
  }
})
