import { $axios, stringify } from '@utils/api'
import { isBlank } from '@utils/validator'

export class Suggest {
  keyword?: string

  constructor(init?: Partial<Suggest>) {
    Object.assign(this, init)
  }

  public static search(form: SuggestSearchForm): Promise<Partial<Suggest>[]> {
    const query = stringify(form)
    // @ts-ignore
    return $axios.$get(`/videos/suggest${isBlank(query) ? '' : '?' + query}`, { baseURL: process.env.endpoint?.backend })
      .then(({ data }) => {
        return data
          .map(keyword => keyword.split(' '))
          .filter(tokens => tokens.length === 2)
          .map(tokens => ({ keyword: tokens[1] }))
      })
  }
}

export interface SuggestSearchForm {
  keyword: string
}
