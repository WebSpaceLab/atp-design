interface IQueryMedia {
  term: string
  month: string
  fileType: string
  orderBy: string
  orderDir: string
  per_page: number
  page: number
}

interface IQueryUsers {
  term: string
  month: string
  column: string
  orderBy: string
  orderDir: string
  per_page: number
  page: number
}

export type { IQueryMedia, IQueryUsers }
