export type Access = 'ADMIN_ROLE' | 'USER_ROLE' | 'COACH_ROLE' | 'EDITOR_ROLE'

export type ExistsCheck = {
    value: boolean,
    message?: string
}