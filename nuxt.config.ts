import { Configuration } from '@nuxt/types'
import { Configuration as WebpackConfiguration } from 'webpack'

const env = require('config')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const config: Configuration = {
  build: {
    cache: true,
    parallel: true,
    publicPath: env.aws.s3.assets,
    extend(config: WebpackConfiguration, { isDev }): void {
      if (isDev) {
        config.devtool = 'eval-source-map'
      }
      config.resolve = config.resolve || {}
      config.resolve.plugins = [new TsconfigPathsPlugin({ configFile: './tsconfig.json', extensions: ['.ts', '.vue'] })]
    }
  },
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  dev: process.env.NODE_ENV === 'development',
  env,
  head: {
    title: 'YTシークレットサーチ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito:100,300,400,500,700,900&display=swap' }
    ]
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/moment',
  ],
  plugins: [
    '@/plugins/axios-accessor',
    '@/plugins/composition-api',
    '@/plugins/filters',
  ],
  render: {
    compressor: (_req, _res, next) => next()
  },
  router: {
    base: '/'
  },
  srcDir: 'src',
  // vuetify: {
  //   optionsPath: '~/options/vuetify.options.js'
  // }
}

module.exports = config
