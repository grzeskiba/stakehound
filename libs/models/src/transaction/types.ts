export interface ITransaction {
  blockNumber: number
  timeStamp: number
  hash: string
  nonce: number
  blockHash: string
  transactionIndex: number
  from: string
  to: string
  value: number
  gas: number
  gasPrice: number
  isError: number
  txreceipt_status: string
  input: string
  contractAddress: string
  cumulativeGasUsed: number
  gasUsed: number
  confirmations: number
}
