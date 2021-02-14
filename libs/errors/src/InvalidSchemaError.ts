export class InvalidSchemaError extends Error {
  constructor(message: string) {
    super(message)
    Error.captureStackTrace(this, InvalidSchemaError)
    this.name = 'InvalidSchemaError'
    Object.setPrototypeOf(this, new.target.prototype) // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
  }
}
