import * as path from 'path'
import {IConfig} from '@stakehound/config'
import {AppContainer} from '@stakehound/ioc'
import {IMintApp} from '@stakehound/mint-app'
import {Types} from '@stakehound/ioc-types'

export const run = async (address: string, config: Partial<IConfig>) => {
  const appContiner = new AppContainer(config as IConfig)
  appContiner.register()
  await appContiner.container.get<IMintApp>(Types.mintApp).start(address)
}
