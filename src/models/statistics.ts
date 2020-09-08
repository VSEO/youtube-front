import { $axios, stringify } from '@utils/api'
import { removeUndefined } from '@utils/transformer'
import { isBlank } from '@utils/validator'

export class Statistics {
  readonly keyword?: string
  readonly averageViewCount?: number = 0
  readonly weeklyPublishCount?: number = 0
  readonly weeklyViewCount?: number = 0

  constructor(init?: Partial<Statistics>) {
    Object.assign(this, init)
  }

  public static search(form: StatisticsSearchForm): Promise<Partial<Statistics>> {
    const query = stringify(removeUndefined(form))
    // @ts-ignore
    return $axios.$get(`/videos/statistics${isBlank(query) ? '' : '?' + query}`, { baseURL: process.env.endpoint?.backend })
      .then(({ data }) => data)
  }
}

export interface StatisticsSearchForm {
  keyword: string
}
