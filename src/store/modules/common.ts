import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { AuthUser } from '@models/user'

@Module({
  name: 'modules/common',
  stateFactory: true,
  namespaced: true
})
export default class CommonModule extends VuexModule {
  _authUser: Partial<AuthUser> | undefined = undefined

  @Mutation
  setAuthUser(authUser: Partial<AuthUser> | undefined) {
    this._authUser = authUser
  }

  @Action({ rawError: true })
  async login({ id, password }: { id: string, password: string }) {
    await AuthUser.login(id, password)
      .then((authUser: Partial<AuthUser>) => this.setAuthUser(authUser))
  }
  @Action({ rawError: true })
  async logout(headers: HeadersInit = {}) {
    this.setAuthUser(undefined)
    await AuthUser.logout()
  }

  get authUser(): AuthUser | undefined {
    return this._authUser ? new AuthUser(this._authUser) : undefined
  }
}
