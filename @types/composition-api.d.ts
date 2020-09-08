import Vue from 'vue'
import { Context } from '@nuxt/types'

declare module '@vue/composition-api/dist/component/component' {
  interface SetupContext {
    readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] }
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    context: Context
  }
}
