export function isEmpty(value: any): boolean {
  return value === null || value === undefined || value === ''
}
export function isBlank(value: any): boolean {
  return isEmpty(value) || value.trim() === ''
}
export function isNumber(value: any): boolean {
  return value !== null && value !== undefined && !isNaN(value)
}
export function isEmail(value: any): boolean {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return pattern.test(value)
}
export function isEnum<T>(value: any, clazz: T): boolean {
  return Object.values(clazz).includes(value)
}
