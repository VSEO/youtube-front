import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Statistics, StatisticsSearchForm } from '@models/statistics'

@Module({
  name: 'modules/statistics',
  stateFactory: true,
  namespaced: true
})
export default class StatisticsModule extends VuexModule {
  _statistics: Partial<Statistics>[] = []

  @Mutation
  setStatistics(statistics: Partial<Statistics>[]) {
    this._statistics = statistics
  }
  @Mutation
  addStatistics(statistics: Partial<Statistics>) {
    this._statistics.push(statistics)
  }
  @Mutation
  removeStatistics(index: number) {
    this._statistics.splice(index, 1)
  }

  @Action({ rawError: true })
  async search(form: StatisticsSearchForm): Promise<any> {
    await Statistics.search(form).then(data => this.addStatistics(
      Object.assign({ keyword: form.keyword }, data)
    ))
  }

  get statistics(): Statistics[] {
    return this._statistics.map(s => new Statistics(s))
  }
}
