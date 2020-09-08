import { $axios } from '@utils/api'

export interface SettingThreshold {
  upper: number
  median: number
  lower: number
}

/**
 * Entity Setting
 */
export class Setting {
  readonly averageViewCount?: SettingThreshold
  readonly weeklyPublishCount?: SettingThreshold
  readonly weeklyViewCount?: SettingThreshold

  constructor(init: Partial<Setting>) {
    Object.assign(this, init)
  }

  static load(): Promise<Setting> {
    // @ts-ignore
    return $axios.$get('/settings', { baseURL: process.env.endpoint?.backend })
      .then(({ data }) => data)
  }
  static update(form: SettingUpdateForm): Promise<any> {
    // @ts-ignore
    return $axios.$patch('settings', form, { baseURL: process.env.endpoint?.backend })
  }
}
export interface SettingUpdateForm {
  averageViewCountUpper: number
  averageViewCountMedian: number
  averageViewCountLower: number
  weeklyPublishCountUpper: number
  weeklyPublishCountMedian: number
  weeklyPublishCountLower: number
  weeklyViewCountUpper: number
  weeklyViewCountMedian: number
  weeklyViewCountLower: number
}
