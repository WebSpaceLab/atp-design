interface IAuthBody {
  email: string
  password: string
}

interface IAuthSession {
  iri: string
  loggedIn: boolean
  token: string
  tokenExpiresAt: string
  roles: string[]
  user: Record<string, any>
}

interface IAuthResponse {
  apiToken: string
  apiTokenExpiresAt: string
  Location: string
}

export type { IAuthBody, IAuthSession, IAuthResponse }