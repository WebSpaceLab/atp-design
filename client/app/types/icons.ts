export type IconCollection = 'heroicons' | 'mdi' | 'material-symbols'

export interface IconProps {
    name: string
    collection?: IconCollection
    size?: 'sm' | 'md' | 'lg'
    color?: string
} 