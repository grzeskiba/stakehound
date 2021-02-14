import {fakeConfig, IConfig} from '@stakehound/config'
import * as faker from 'faker'
import {ApiCallError, ApiResultWindowError, InvalidApiResponseError, InvalidSchemaError} from '@stakehound/errors'
import {ILogger, TestLogger} from '@stakehound/logger'
import {AxiosInstance} from 'axios'
import {EtherscanClient, IEtherscanClient} from './EtherscanClient'

describe('EtherscanClient', () => {
  let client: IEtherscanClient
  let axiosInstance: AxiosInstance
  let config: IConfig
  let logger: ILogger
  let address: string
  let page: number
  let offset: number

  beforeEach(() => {
    config = fakeConfig()
    logger = new TestLogger()
    address = faker.random.word()
    page = faker.random.number({min: 1, max: 10})
    offset = faker.random.number({min: 10, max: 10})
  })

  describe('when api', () => {
    describe('returns not successful response', () => {
      beforeEach(() => {
        axiosInstance = (jest.fn().mockResolvedValue({status: 500}) as unknown) as AxiosInstance
        client = new EtherscanClient(config, logger, axiosInstance)
      })

      it('should throw ApiCallError', async () => {
        await expect(client.getAccountTransactions(address, page, offset)).rejects.toThrowError(ApiCallError)
      })
    })

    describe('returns too large window message', () => {
      beforeEach(() => {
        axiosInstance = (jest.fn().mockResolvedValueOnce({
          status: 200,
          data: {
            message: 'Result window is too large, PageNo x Offset size must be less than or equal to 10000',
          },
        }) as unknown) as AxiosInstance
        client = new EtherscanClient(config, logger, axiosInstance)
      })
      it('should throw ApiResultWindowError', async () => {
        await expect(client.getAccountTransactions(address, page, offset)).rejects.toThrowError(ApiResultWindowError)
      })
    })

    describe('returns invalid format response', () => {
      beforeEach(() => {
        axiosInstance = (jest.fn().mockResolvedValueOnce({
          status: 200,
          data: {
            message: '',
            result: {},
          },
        }) as unknown) as AxiosInstance
        client = new EtherscanClient(config, logger, axiosInstance)
      })

      it('should throw InvalidApiResponseError', async () => {
        await expect(client.getAccountTransactions(address, page, offset)).rejects.toThrowError(InvalidApiResponseError)
      })
    })

    describe('returns invalid transaction', () => {
      beforeEach(() => {
        axiosInstance = (jest.fn().mockResolvedValueOnce({
          status: 200,
          data: {
            message: '',
            result: [{[faker.random.word()]: faker.random.word()}],
          },
        }) as unknown) as AxiosInstance
        client = new EtherscanClient(config, logger, axiosInstance)
      })

      it('should throw InvalidSchemaError', async () => {
        await expect(client.getAccountTransactions(address, page, offset)).rejects.toThrowError(InvalidSchemaError)
      })
    })
  })
})
