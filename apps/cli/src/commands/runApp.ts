import * as path from 'path'
import {run} from '../app/run'

export const runAppCommand = {
  command: '$0 <address> <apiKey>',
  describe: 'Watches provided address',
  builder: {
    address: {
      alias: 'a',
      string: true,
      describe: 'target address',
    },
    verbose: {
      alias: 'v',
      describe: 'set to activate logging',
      boolean: true,
      default: false,
    },
    fetchInterval: {
      alias: 'fi',
      describe: 'Fetch address info internval (ms)',
      default: 500,
    },
    outputFile: {
      alias: 'o',
      describe: 'Output file path',
      default: path.join(process.cwd(), 'output.txt'),
    },
    apiUrl: {
      alias: 'au',
      describe: 'Api Url',
      default: 'https://api-ropsten.etherscan.io/api',
    },
    transactionPageSize: {
      alias: 'tps',
      describe: 'Transaction per page',
      default: 10,
    },
    apiKey: {
      alias: 'ak',
      describe: 'apiKey',
      string: true,
    },
  },
  handler: async ({address, apiKey, apiUrl, fetchInterval, outputFile, transactionPageSize, verbose}) => {
    run(address, {apiKey, apiUrl, fetchInterval, outputFile, transactionPageSize, verbose})
  },
}
