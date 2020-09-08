import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import CommonModule from '@store/modules/common'
import UsersModule from '@store/modules/users'
import SettingsModule from '@store/modules/settings'
import StatisticsModule from '@store/modules/statistics'
import SuggestsModule from '@store/modules/suggests'

let commonStore: CommonModule
let usersStore: UsersModule
let settingsStore: SettingsModule
let statisticsStore: StatisticsModule
let suggestsStore: SuggestsModule

function initialiseStores(store: Store<any>): void {
  commonStore = getModule(CommonModule, store)
  usersStore = getModule(UsersModule, store)
  settingsStore = getModule(SettingsModule, store)
  statisticsStore = getModule(StatisticsModule, store)
  suggestsStore = getModule(SuggestsModule, store)
}

export {
  initialiseStores,
  commonStore,
  usersStore,
  settingsStore,
  statisticsStore,
  suggestsStore
}
