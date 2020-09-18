import moment from 'moment'

export function removeUndefined<T>(obj: T): T {
  if (!(obj instanceof Object)) {
    throw new Error('Invalid arguments')
  }
  // @ts-ignore
  return Object.keys(obj).filter(key => obj[key] !== undefined).reduce((newObj, key) => Object.assign(newObj, {[key]: obj[key]}), {}) as T
}
export function formatDate(value: any, format: string = 'YYYY-MM-DD'): string {
  return moment(value).format(format)
}
export function formatDateTime(value: any, format: string = 'YYYY-MM-DD HH:mm'): string {
  return moment(value).format(format)
}
export function formatNumber(value: any): string {
  return value?.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}
export function truncate(value: any, length: number = 200): string {
  return value && value.length > length ? value.substring(0, length) + '...' : value
}
