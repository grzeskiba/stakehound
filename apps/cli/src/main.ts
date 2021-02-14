import 'reflect-metadata'
import * as yargs from 'yargs'
import {runAppCommand} from './commands/runApp'

yargs
  .usage('Usage: mint-cli <command> [options]')
  .command(runAppCommand)
  .help('h')
  .alias('h', 'help')
  .demandCommand()
  .strict(true)
  .showHelpOnFail(true).argv
