import { Middleware } from '@nuxt/types'

const authenticated: Middleware = ({ redirect, store }) => {
  if (!store.state.modules['common']._authUser) {
    return redirect(301, '/login')
  }
}

export default authenticated
