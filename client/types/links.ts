import type { Access } from '~~/types/guard'

export type Link = {
    label: string
    icon?: string
    to: string
    type?: string
    access?: Access[],
    name?: string
    tree?: Link[]
}