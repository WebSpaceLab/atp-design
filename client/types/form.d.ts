interface IForm<T> {
  body: T
  errors: Record<string, string>
  error: string | null
  dirty: boolean
  hasErrors: boolean
  loading: boolean
  wasSuccessful: boolean
  recentlySuccessful: boolean

  submit(path: string, method: string, hooks: Record<string, any>, options: Record<string, any>): void
  clearErrors(): void
  clearError(): void
  setError(error: string): void
  setErrors(errors: Record<string, string>): void
  reset(): void
}

interface IFormResponse {
  data: Record<string, any>
  flash: {
    message: string
    style: string
  }
  refresh: boolean
  redirect: string
}

export type { IForm, IFormResponse }
