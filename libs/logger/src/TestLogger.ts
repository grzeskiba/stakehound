/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {ILogger} from './types'

export class TestLogger implements ILogger {
  debug(...args: unknown[]): void {}
  error(...args: unknown[]): void {}
  info(...args: unknown[]): void {}
}
