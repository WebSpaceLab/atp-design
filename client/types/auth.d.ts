declare module '#auth-utils' {
  interface User {
    // Add your own fields
    // username: string
    // avatarUrl: string
    // email: string
    // iri: string
  }

  interface UserSession {
    // Add your own fields
    iri: string
    loggedInAt: Date
  }
}

export { }