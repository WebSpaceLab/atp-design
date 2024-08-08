import type { Access } from '~~/types//guard'

export const useUseGuard = () => {

  const checkAccess = (session: any, access: Access[]) => {
    return access.filter((role) => session.role === role).length > 0
  }

  return {
    checkAccess
  }
}
