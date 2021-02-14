import * as faker from 'faker'
import {IConfig} from '../types'

export const fakeConfig = (): IConfig => ({
  apiKey: faker.random.word(),
  apiUrl: faker.random.word(),
  fetchInterval: faker.random.number(),
  outputFile: faker.random.word(),
  transactionPageSize: faker.random.number(),
  verbose: faker.random.boolean(),
})
