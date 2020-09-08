import { Plugin } from '@nuxt/types'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { initializeAxios } from '@utils/api'
import { commonStore } from '@store/index'

const accessor: Plugin = ({ $axios, redirect }) => {
  $axios.onRequest((config: AxiosRequestConfig) => {
    config.headers.common.Accept = 'application/json'
    if (commonStore.authUser?.token) {
      config.headers.Authorization = `Bearer ${commonStore.authUser?.token}`
    }
    return config
  })
  $axios.onResponse((response: AxiosResponse) => {
    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true })
    }
    return response
  })
  $axios.onResponseError(async (error: AxiosError) => {
    if (error?.response?.status === 401) {
      await commonStore.logout(error?.config.headers)
      redirect(301, '/login')
    }
    throw error
  })

  initializeAxios($axios)
}

export default accessor
