interface IPagination {
  total: number | null
  current_page: number | null
  per_page: number | null
  first_page: number
}

export type { IPagination }
