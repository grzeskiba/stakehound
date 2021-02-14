export class InvalidApiResponseError extends Error {
  constructor(message: string) {
    super(message)
    Error.captureStackTrace(this, InvalidApiResponseError)
    this.name = 'InvalidApiResponseError'
    Object.setPrototypeOf(this, new.target.prototype) // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
  }
}
