import type {IConfig} from '@stakehound/config'
import {ApiCallError, ApiResultWindowError, InvalidApiResponseError, InvalidSchemaError} from '@stakehound/errors'
import {Types} from '@stakehound/ioc-types'
import type {ILogger} from '@stakehound/logger'
import {ITransaction, transactionMapper, transactionSchema} from '@stakehound/models'
import Ajv from 'ajv'
import {AxiosInstance, AxiosResponse} from 'axios'
import {inject, injectable} from 'inversify'

import {applyUrlParamsAndQuery, isRequestSuccess, isResultWindowTooLarge} from './utils'

export interface IEtherscanClient {
  getAccountTransactions(address: string, page: number, offset: number): Promise<ITransaction[]>
}

@injectable()
export class EtherscanClient implements IEtherscanClient {
  private readonly _config: IConfig
  private readonly _logger: ILogger
  private readonly _axiosInstance: AxiosInstance

  constructor(
    @inject(Types.config) config: IConfig,
    @inject(Types.logger) logger: ILogger,
    @inject(Types.axios) axiosInstance: AxiosInstance
  ) {
    this._config = config
    this._logger = logger
    this._axiosInstance = axiosInstance
  }

  getAccountTransactions = async (address: string, page: number, offset: number) => {
    try {
      this._logger.info('etherscan_client_get_account_transactions', {address, page, offset})
      const response = await this._axiosInstance({
        url: applyUrlParamsAndQuery(this._config.apiUrl)(
          {},
          {address, page, offset, sort: 'asc', module: 'account', action: 'txlist', apiKey: this._config.apiKey}
        ),
      })

      this._validateAccountTransactionsAxiosResponse(response)
      const transactions = this._getAccountTransactionsFromAxiosResponse(response)
      this._logger.info('etherscan_client_get_account_transactions_success', {transactionCount: transactions.length})
      return transactions
    } catch (err) {
      this._logger.error('etherscan_client_get_account_transactions_error', {err})
      throw err
    }
  }

  private _getAccountTransactionsFromAxiosResponse = (axiosResponse: AxiosResponse) =>
    axiosResponse.data.result.map(transactionMapper)

  private _validateAccountTransactionsAxiosResponse = ({status, statusText, data}: AxiosResponse) => {
    if (!isRequestSuccess(status)) {
      throw new ApiCallError(statusText)
    }
    if (isResultWindowTooLarge(data)) {
      throw new ApiResultWindowError(data.message)
    }

    const result = data.result

    if (!Array.isArray(result)) {
      throw new InvalidApiResponseError('Account transactions response has invalid format')
    }
    result.every((d) => this._validateAccountTransaction(d))
  }

  private _validateAccountTransaction = (data: unknown) => {
    const ajv = new Ajv({allErrors: true, coerceTypes: true, useDefaults: true, strict: false})
    ajv.validate(transactionSchema, data)
    if (ajv.errors) {
      throw new InvalidSchemaError(ajv.errors.join('\n'))
    }
  }
}
