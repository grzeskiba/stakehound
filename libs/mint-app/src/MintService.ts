import * as fs from 'fs'
import type {IConfig} from '@stakehound/config'
import {Types} from '@stakehound/ioc-types'
import type {ITransaction} from '@stakehound/models'
import {inject, injectable} from 'inversify'
import {promisify} from 'util'
import type {ILogger} from '@stakehound/logger'

const appendFileAsync = promisify(fs.appendFile)
const readFileAsync = promisify(fs.readFile)
const existsAsync = promisify(fs.exists)

export interface IMintService {
  getTransactionCount(): Promise<number>
  saveTransactions(transactions: ITransaction[]): Promise<void>
}

@injectable()
export class MintService implements IMintService {
  private readonly _config: IConfig
  private readonly _logger: ILogger

  constructor(@inject(Types.config) config: IConfig, @inject(Types.logger) logger: ILogger) {
    this._config = config
    this._logger = logger
  }

  getTransactionCount = async () => {
    try {
      this._logger.info('mint_service_get_transaction_count')
      return (await existsAsync(this._config.outputFile))
        ? (await readFileAsync(this._config.outputFile)).toString().split('\n').length
        : 0
    } catch (err) {
      this._logger.error('mint_service_get_transaction_count_error', {err})
      throw err
    }
  }

  saveTransactions = async (transactions: ITransaction[]) => {
    try {
      this._logger.info('mint_service_save_transactions')
      const content = this._toTransactionContent(transactions)
      await appendFileAsync(this._config.outputFile, content)
    } catch (err) {
      this._logger.error('min_data_save_error', {err})
      throw err
    }
  }

  private _toTransactionContent = (transactions: ITransaction[]) =>
    transactions.reduce((acc, curr) => `${acc}MINT ${curr.value} ${curr.to}\n`, '')
}
