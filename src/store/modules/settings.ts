import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Setting, SettingUpdateForm } from '@models/setting'

@Module({
  name: 'modules/settings',
  stateFactory: true,
  namespaced: true
})
export default class SettingsModule extends VuexModule {
  _setting?: Partial<Setting>

  @Mutation
  setSetting(setting: Partial<Setting>) {
    this._setting = setting
  }

  @Action({ rawError: true })
  async load(): Promise<any> {
    await Setting.load().then(data => {
      this.setSetting(data)
    })
  }
  @Action({ rawError: true })
  async update(form: SettingUpdateForm): Promise<any> {
    await Setting.update(form)
  }

  get setting(): Setting | undefined {
    return this._setting ? new Setting(this._setting) : undefined
  }
}
