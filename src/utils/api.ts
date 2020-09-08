import { NuxtAxiosInstance } from '@nuxtjs/axios'
import * as QueryString from 'query-string'

let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance
}
export interface SearchForm {
  page?: number
  count?: number
  sort?: { key: string; desc: boolean }
}
export function toQuery(form: SearchForm): string {
  const _sort = form.sort ? `${form.sort.key} ${form.sort.desc ? 'desc' : 'asc'}` : undefined
  const _form = _sort ? Object.assign({}, form, { sort: _sort }) : form
  return QueryString.stringify(_form)
}
export function stringify(object: object): string {
  return QueryString.stringify(object)
}

export { $axios }
