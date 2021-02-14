import type {IConfig} from '@stakehound/config'
import {Types} from '@stakehound/ioc-types'
import {inject, injectable} from 'inversify'

export interface IMintWorker {
  run(cb: () => Promise<void>): Promise<void>
}

@injectable()
export class MintWorker implements IMintWorker {
  private readonly _config: IConfig

  constructor(@inject(Types.config) config: IConfig) {
    this._config = config
  }

  run = async (cb: () => Promise<void>) => {
    setTimeout(async () => {
      await cb()
      this.run(cb)
    }, this._config.fetchInterval)
  }
}
