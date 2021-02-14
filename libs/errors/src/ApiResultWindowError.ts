export class ApiResultWindowError extends Error {
  constructor(message: string) {
    super(message)
    Error.captureStackTrace(this, ApiResultWindowError)
    this.name = 'ApiResultWindowError'
    Object.setPrototypeOf(this, new.target.prototype) // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
  }
}
