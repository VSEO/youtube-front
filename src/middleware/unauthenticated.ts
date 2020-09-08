import { Middleware } from '@nuxt/types'

const unauthenticated: Middleware = ({ redirect, store }) => {
  if (store.state.modules['common']._authUser) {
    return redirect(301, '/')
  }
}

export default unauthenticated
