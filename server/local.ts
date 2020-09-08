export {}

const { Nuxt, Builder } = require('nuxt')
const consola = require('consola')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const port: number = parseInt(process.env.PORT || '3000')
const host: string = process.env.HOST || 'localhost'

// Init Nuxt.js
const config = require('../nuxt.config')
const nuxt = new Nuxt(config)

const app = express()
app.set('port', port)
app.use(bodyParser.json())
app.use(session(config.env.session))
app.use(cookieParser())

// Init apis
const auth = require('./api/auth')
app.use('/api/auth', auth)

async function start () {
  await nuxt.ready()

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
