import type { Link } from '~~/types/links'

export type Sidebar = {
    isShow: boolean
    isRail: boolean
    isRightSide: boolean
    isShowHelperBar: boolean
    links: Link[]
}