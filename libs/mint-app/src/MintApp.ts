import {Types} from '@stakehound/ioc-types'
import {inject, injectable} from 'inversify'
import type {IMintService} from './MintService'
import type {IMintWorker} from './MintWorker'
import type {IEtherscanClient} from '@stakehound/etherscan-client'
import type {IConfig} from '@stakehound/config'
import {ApiCallError, ApiResultWindowError, InvalidSchemaError} from '@stakehound/errors'
import type {ILogger} from '@stakehound/logger'

export interface IMintApp {
  start(address: string): Promise<void>
}

@injectable()
export class MintApp implements IMintApp {
  private readonly _mintWorker: IMintWorker
  private readonly _mintService: IMintService
  private readonly _etherscanClient: IEtherscanClient
  private readonly _config: IConfig
  private readonly _logger: ILogger

  constructor(
    @inject(Types.mintWorker) mintWorker: IMintWorker,
    @inject(Types.mintService) mintService: IMintService,
    @inject(Types.etherscanClient) etherscanClient: IEtherscanClient,
    @inject(Types.config) config: IConfig,
    @inject(Types.logger) logger: ILogger
  ) {
    this._mintWorker = mintWorker
    this._mintService = mintService
    this._etherscanClient = etherscanClient
    this._config = config
    this._logger = logger
  }

  start = async (address: string) => {
    try {
      let transacionsCount = await this._mintService.getTransactionCount()
      this._mintWorker.run(async () => {
        try {
          this._logger.info('mint_app_start', {address})
          const transactions = await this._etherscanClient.getAccountTransactions(
            address,
            Math.floor(transacionsCount / this._config.transactionPageSize) + 1,
            this._config.transactionPageSize
          )
          await this._mintService.saveTransactions(transactions)
          transacionsCount += transactions.length
        } catch (err) {
          this._logger.error('mint_app_start_error', {err})
          this._handleError(err)
        }
      })
    } catch (err) {
      this._logger.error('mint_app_start_error', {err})
      this._handleError(err)
    }
  }

  private _handleError(error: Error) {
    if (error instanceof ApiCallError) {
      // handle ApiCallError
    } else if (error instanceof ApiResultWindowError) {
      // handle ApiResultWindowError
    } else if (error instanceof InvalidSchemaError) {
      // handle instanceof
    } else {
      throw error
    }
  }
}
