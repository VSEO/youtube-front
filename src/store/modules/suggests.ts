import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Suggest, SuggestSearchForm } from '@models/suggest'

@Module({
  name: 'modules/suggests',
  stateFactory: true,
  namespaced: true
})
export default class SuggestsModule extends VuexModule {
  _keyword: string = ''
  _suggests: Partial<Suggest>[] = []

  @Mutation
  setKeyword(keyword: string) {
    this._keyword = keyword
  }
  @Mutation
  setSuggests(suggests: Partial<Suggest>[]) {
    this._suggests = suggests
  }

  @Action({ rawError: true })
  async search(form: SuggestSearchForm): Promise<any> {
    await Suggest.search(form)
      .then(data => this.setSuggests(data.slice(0, 3)))
      .finally(() => this.setKeyword(form.keyword))
  }

  get keyword(): string {
    return this._keyword
  }
  get suggests(): Suggest[] {
    return this._suggests.map(s => new Suggest(s))
  }
}
