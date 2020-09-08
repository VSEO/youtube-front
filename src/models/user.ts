import { $axios, SearchForm, toQuery } from '@utils/api'
import { removeUndefined } from '@utils/transformer'
import { isBlank } from '@utils/validator'

/**
 * Entity User
 */
export class User {
  readonly id?: number
  readonly password?: string
  readonly role?: Role
  readonly createdAt?: string
  readonly updatedAt?: string

  constructor(init: Partial<User>) {
    Object.assign(this, init)
  }

  get roleName(): string {
    return Role.toString(this.role!!)
  }
  static search(form: UserSearchForm): Promise<{ total: number; data: Partial<User>[] }> {
    const query = toQuery(removeUndefined(form))
    // @ts-ignore
    return $axios.$get(`/users${isBlank(query) ? '' : '?' + query}`, { baseURL: process.env.endpoint?.backend })
  }
  static register(form: UserRegisterForm): Promise<any> {
    // @ts-ignore
    return $axios.$post('/users', form, { baseURL: process.env.endpoint?.backend })
  }
  static update(form: UserUpdateForm): Promise<any> {
    // @ts-ignore
    return $axios.$patch(`/users/${form.id}`, form, { baseURL: process.env.endpoint?.backend })
  }
  static delete(id: number): Promise<any> {
    // @ts-ignore
    return $axios.$delete(`/users/${id}`, { baseURL: process.env.endpoint?.backend })
  }
}
export interface UserSearchForm extends SearchForm {}
export interface UserRegisterForm {
  id: string
  password: string
  role: Role
}
export interface UserUpdateForm {
  password?: string
  role: Role
}

/**
 * Entity AuthUser
 */
export class AuthUser {
  readonly id?: number
  readonly role?: Role
  readonly token?: string

  constructor(init: Partial<AuthUser>) {
    Object.assign(this, init)
  }

  public isAdmin(): boolean {
    return this.role === Role.ADMIN
  }

  static login(id: string, password: string): Promise<Partial<AuthUser>> {
    // @ts-ignore
    return $axios.$post('/api/auth/login', { id, password }, { baseURL: process.env.endpoint?.frontend })
  }
  static logout(): Promise<any> {
    // @ts-ignore
    return $axios.$post('/api/auth/logout', {}, { baseURL: process.env.endpoint?.frontend })
  }
}

/**
 * Enum Role
 */
enum Role {
  ADMIN = 1,
  USER = 2,
}
namespace Role {
  const roleMapping = {
    [Role.ADMIN]: '管理者',
    [Role.USER]: 'ユーザー',
  }
  export function toString(role: Role): string {
    if (!roleMapping[role]) {
      throw new Error('Undefined Role')
    }
    return roleMapping[role]
  }
  export function toArray(exclude: Role[]): { text: string, value: number }[] {
    return Object.entries(roleMapping)
      .map(([key, value]) => ({ text: value, value: parseInt(key) }))
      .filter(item => !exclude.includes(item.value))
  }
}
export { Role }
