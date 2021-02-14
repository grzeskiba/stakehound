import {parseNumber, identity, fromSnakeToCamelCase, createMapper} from '../utils'
import {ITransaction} from './types'

const transactionMapperMap = {
  blockNumber: parseNumber,
  timeStamp: parseNumber,
  hash: identity,
  nonce: parseNumber,
  blockHash: identity,
  transactionIndex: parseNumber,
  from: identity,
  to: identity,
  value: parseNumber,
  gas: parseNumber,
  gasPrice: parseNumber,
  isError: parseNumber,
  txreceipt_status: [identity, fromSnakeToCamelCase],
  input: identity,
  contractAddress: identity,
  cumulativeGasUsed: parseNumber,
  gasUsed: parseNumber,
  confirmations: parseNumber,
}

export const transactionMapper = createMapper<ITransaction>(transactionMapperMap)
