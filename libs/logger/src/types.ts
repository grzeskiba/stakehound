export interface ILogger {
  debug(message?: unknown, ...optionalParams: unknown[]): void
  error(message?: unknown, ...optionalParams: unknown[]): void
  info(message?: unknown, ...optionalParams: unknown[]): void
}
