interface Activity {
  id: number
  description: string
  time: string
}

interface Notification {
  id: number
  type: 'warning' | 'error' | 'info'
  message: string
}

export type { Activity, Notification }