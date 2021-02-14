import {IConfig} from '@stakehound/config'
import {EtherscanClient, IEtherscanClient} from '@stakehound/etherscan-client'
import {Types} from '@stakehound/ioc-types'
import {ILogger, Logger} from '@stakehound/logger'
import {IMintService, IMintWorker, MintService, MintWorker, IMintApp, MintApp} from '@stakehound/mint-app'
import axios, {AxiosInstance} from 'axios'
import {Container} from 'inversify'

export interface IAppContainer {
  register(): void

  container: Container
}

export class AppContainer {
  private readonly _container: Container
  private readonly _config: IConfig

  constructor(config: IConfig) {
    this._config = config
    this._container = new Container()
  }

  register() {
    this._container.bind<IConfig>(Types.config).toConstantValue(this._config)
    this._container.bind<AxiosInstance>(Types.axios).toConstantValue(axios.create())
    this._container.bind<ILogger>(Types.logger).to(Logger)
    this._container.bind<IEtherscanClient>(Types.etherscanClient).to(EtherscanClient)
    this._container.bind<IMintApp>(Types.mintApp).to(MintApp)
    this._container.bind<IMintWorker>(Types.mintWorker).to(MintWorker)
    this._container.bind<IMintService>(Types.mintService).to(MintService)
  }

  get container() {
    return this._container
  }
}
