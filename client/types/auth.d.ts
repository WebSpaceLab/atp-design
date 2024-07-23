declare module '#auth-utils' {
  interface User {
    // Add your own fields
    username: string
    avatarUrl: string
    email: string
    lastName: string
    firstName: string
  }

  interface UserSession {
    // Add your own fields
    role: string
    loggedInAt: Date
  }
}

export { }

export type AuthModalState = {
  isOpenRegister: boolean
  isOpenLogin: boolean
}

export type AuthErrorBag = {
  email?: string
  name?: string
  password?: string
  password_confirmation?: string
}