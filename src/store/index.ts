import { ActionTree, Store } from 'vuex'
import { ActionContext } from 'vuex/types'
import { Context } from '@nuxt/types'
import { initialiseStores } from '@utils/store-accessor'
import { commonStore } from '@store/index.ts'

export type RootState = {}
const initializer = (store: Store<any>) => initialiseStores(store)

export const plugins = [initializer]

export const state = (): RootState => ({})
export const actions: ActionTree<any, any> = {
  async nuxtServerInit(context: ActionContext<RootState, RootState>, server: Context) {
    // @ts-ignore
    commonStore.setAuthUser(server.req.session?.authUser)
  }
}

export * from '@utils/store-accessor'
