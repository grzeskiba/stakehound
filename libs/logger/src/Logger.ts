import type {IConfig} from '@stakehound/config'
import {Types} from '@stakehound/ioc-types'
import {inject, injectable} from 'inversify'
import type {ILogger} from './types'

/**
 * This is a simple logger service, in real world scenerio it should be winston or bunyan
 */
@injectable()
export class Logger implements ILogger {
  private readonly _config: IConfig

  constructor(@inject(Types.config) config: IConfig) {
    this._config = config
  }

  debug(message?: unknown, ...optionalParams: unknown[]): void {
    if (this._config.verbose) {
      console.debug(message, optionalParams)
    }
  }
  error(message?: unknown, ...optionalParams: unknown[]): void {
    if (this._config.verbose) {
      console.error(message, optionalParams)
    }
  }
  info(message?: unknown, ...optionalParams: unknown[]): void {
    if (this._config.verbose) {
      console.info(message, optionalParams)
    }
  }
}
