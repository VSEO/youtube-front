import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { UserRegisterForm, UserSearchForm, UserUpdateForm, User } from '@models/user'

@Module({
  name: 'modules/users',
  stateFactory: true,
  namespaced: true
})
export default class UsersModule extends VuexModule {
  _conditions: UserSearchForm = { page: 1, count: 10, sort: { key: 'id', desc: true } }
  _users: Partial<User>[] = []
  _total: number = 0

  @Mutation
  setConditions(conditions: UserSearchForm) {
    Object.assign(this._conditions, conditions)
  }
  @Mutation
  setUsers(users: Partial<User>[]) {
    this._users = users
  }
  @Mutation
  setTotal(total: number) {
    this._total = total
  }

  @Action({ rawError: true })
  async search(): Promise<any> {
    await User.search(this.conditions).then(({ total, data }) => {
      this.setTotal(total)
      this.setUsers(data)
    })
  }
  @Action({ rawError: true })
  async register(form: UserRegisterForm): Promise<any> {
    await User.register(form)
  }
  @Action({ rawError: true })
  async update(form: UserUpdateForm): Promise<any> {
    await User.update(form)
  }
  @Action({ rawError: true })
  async delete({ id }: { id: number }): Promise<any> {
    await User.delete(id)
  }

  get conditions(): UserSearchForm {
    return this._conditions
  }
  get users(): Partial<User>[] {
    return this._users.map(u => new User(u))
  }
  get total(): number {
    return this._total
  }
}
