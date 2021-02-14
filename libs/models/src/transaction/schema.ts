import {JSONSchema7} from 'json-schema'

export const transactionSchema: JSONSchema7 = {
  $id: 'transaction-schema',
  type: 'object',
  properties: {
    blockNumber: {
      type: 'number',
    },
    timeStamp: {
      type: 'number',
    },
    hash: {
      type: 'string',
    },
    nonce: {
      type: 'string',
    },
    blockHash: {
      type: 'string',
    },
    transactionIndex: {
      type: 'number',
    },
    from: {
      type: 'string',
    },
    to: {
      type: 'string',
    },
    value: {
      type: 'number',
    },
    gas: {
      type: 'number',
    },
    isError: {
      type: 'number',
    },
    txreceipt_status: {
      type: 'string',
    },
    input: {
      type: 'string',
    },
    contractAddress: {
      type: 'string',
    },
    cumulativeGasUsed: {
      type: 'string',
    },
    gasUsed: {
      type: 'string',
    },
    confirmations: {
      type: 'number',
    },
  },
  required: [
    'blockNumber',
    'timeStamp',
    'hash',
    'nonce',
    'blockHash',
    'transactionIndex',
    'from',
    'to',
    'value',
    'gas',
    'gasPrice',
    'isError',
    'txreceipt_status',
    'input',
    'contractAddress',
    'cumulativeGasUsed',
    'gasUsed',
    'confirmations',
  ],
}
