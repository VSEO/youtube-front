import { Middleware } from '@nuxt/types'
import { Role } from '@models/user'

const authenticated: Middleware = ({ redirect, store }) => {
  const authUser = store?.state?.modules?.['common']?._authUser
  if (!authUser) {
    return redirect(301, '/login')
  }
  if (authUser.role !== Role.ADMIN) {
    return redirect(301, '/')
  }
}

export default authenticated
